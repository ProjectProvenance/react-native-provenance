# react-native-provenance

Library to add [Provenance](https://provenance.org) experiences into your mobile applications to validate sustainability credentials of products you sell.

The package provides Trust Badge and Bundle components. Both are meant to be shown on your product page. Trust Badge as a quick indication that a product
has sustainability claims. Buyers can click on it to further see details in the Bundle component.

## Installation

Dependencies:

`react-native-webview` should be installed to your application first. Make sure it matches the version specified in the package.json of this package.

Steps:

1. Make sure `react-native-webview` is installed:

```sh
npx expo install react-native-webview@^13.10.3
```

2. Install the package:

```sh
npm install @provenance/react-native-provenance --save
```

The `--save` option is [important for autolinking](https://reactnative.dev/docs/linking-libraries-ios#automatic-linking).

3. Run:

```sh
npx expo run:android --no-build-cache
```

to ensure native dependencies are linked.

4. Run the app using:

```sh
npx expo start
```

Note, despite the steps mention Expo, the expo is not necessary, vanilla react-native with `npm` or `yarn` should work as well.

### Common issues

#### RNCWebView module could not be found

Use developers build. First, run:

```sh
npx expo run:android --no-build-cache
```

After the error message disappears, you can start emulator with:

```sh
npx expo run:android
```

and switch between the build types from Expo CLI menu.

## Usage

There are 2 ways how to integrate Provenance components:

- The easiest one: by using our built in modal
- Allows more customizations: by using Trust Badge and Bundle separately

In both cases you will need `apiKey`, `bundleId` and `productSku`.
For `apiKey` and `bundleId` use the same values you may already received from our support team or request those.

You must call `configure` before rendering the components.

```
import { configure } from "@provenance/react-native-provenance";

configure({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  bundleId: process.env.EXPO_PUBLIC_BUNDLE_ID,
});
```

We recommend reading API_KEY value from the environment variable, like in example above if you use Expo.

`productSku` is a unique identifier of a product, it is the same as on your retail website.

### Using our built in modal

This is a default method.
When user taps on the TrustBadge a modal will pop up displaying the Bundle. This method is very easy to start with.

[See demo gif](docs/assets/ModalDemo2024-07-24%20at%2013.09.56.gif)

```typescript
// import your UI components: ProductTitle, ProductPrice etc...
import { TrustBadge } from "@provenance/react-native-provenance";

export function ProductPage () {
  return (
    <View>
        <ProductTitle>Organic apple</ProductTitle>
        <ProductPrice>£1.99</ProductPrice>
        <Button>Add to Basket</Button>

        <TrustBadge sku={productSku} />

        <ProductDescription>
            Indulge in the pure essence of nature with our premium organic apples.
        </ProductDescription>
    </View>
  );
}
```

You may provide `overlayHeight={'80%'}` prop it defines the height of the overlay when Proof Point detail is revealed. The supported values are percentage or number.

You may already have established UI patterns to handle overlays, for instance, your modal component or some `BottomSheet` library that you want to use as a container for the Bundle. If this is the case, check the next section.

### Using Trust Badge and Bundle with your overlay

This method allows you to use any overlay component that you wish but requires more configuration.

[See demo gif](docs/assets/DrawerDemo2024-07-24%20at%2013.05.14.gif)

```typescript
// import your UI components: ProductTitle, ProductPrice etc...
// @gorhom/bottom-sheet is just an example library, you can choose any
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Bundle, TrustBadge, getBundleLoadingHeight } from "@provenance/react-native-provenance";

export function ProductPage () {
  const [sheetShown, setSheetShown] = useState(false);
  const [bundleContainerHeight, setBundleContainerHeight] = useState(getBundleLoadingHeight());
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && sheetShown) {
        setSheetShown(false);
      }
    },
    [sheetShown]
  );

  const handleTrustBadgePress = () => setSheetShown(!sheetShown);

  return (
    <View>
        <ProductTitle>Organic apple</ProductTitle>
        <ProductPrice>£1.99</ProductPrice>
        <Button>Add to Basket</Button>

        <TrustBadge onPress={handleTrustBadgePress} overlay={false} sku={productSku} />

        <ProductDescription>
            Indulge in the pure essence of nature with our premium organic apples.
        </ProductDescription>

        {sheetShown && (
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[185, 590]}
                enablePanDownToClose={true}
                enableDynamicSizing={true}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            height: bundleContainerHeight,
                            paddingBottom: 10,
                        }}
                    >
                        <Bundle
                            sku={productSku}
                            onResized={(newSize: number) => {
                                setBundleContainerHeight(newSize);
                                bottomSheetRef.current?.snapToPosition(newSize);
                            }}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheet>
        )}
    </View>
  );
}
```

#### getBundleLoadingHeight

`getBundleLoadingHeight` - returns a number representing height of the Bundle element while it is loading.

We don't know what the height of the Bundle will be in advance because it depends on the exact variant of the bundle (cards vs capsules), amount of Proof Points for the given product, width of the screen. Since the loading of the bundle may take some time (network dependent) we need to give feedback to the user that something is loading. For that the webview is opened to bundle loading height so that the user sees the loading state within it.

You can use the value returned by this function to set default size for your overlay component.

#### onResized callback

After Bundle finishes loading the `onResized` callback is called with the actual height as an argument.

This callback is also called when Proof Point Details Modal is shown. This happens after user taps on a Proof Point and its details finished loading.

You should pass your function to `onResized` prop. It should take the `height` argument and adjust your overlay component so that Bundle have enough space to display the content.

#### What if I need to add margin around the bundle?

Just add it to the `getBundleLoadingHeight` and `height` in `onResized` callback. Let's say you want to have more space between head of your BottomSheet and from the bottom of the screen. You could do something like:

```typescript
  const verticalMargin = 20;
  const [bundleContainerHeight, setBundleContainerHeight] = useState(getBundleLoadingHeight() + verticalMargin);

  // . . .
  <Bundle
    onResized={(newSize: number) => {
      setBundleContainerHeight(newSize + verticalMargin);
      bottomSheetRef.current?.snapToPosition(newSize + verticalMargin);
    }}
```

#### I want ProofPoints details modal to take more height

`Bundle` component takes whole available space of the container. So if you want to let your users scroll less you could make your Overlay component taller when modal opened. For example:

```
  <Bundle
    bundleId={design.bundleId}
    sku={design.sku}
    onResized={(newSize: number) => {
      // we still need this callback to make sure the container has enough of space to display Bundle
      setBundleContainerHeight(newSize);
      bottomSheetRef.current?.snapToPosition(newSize);
    }}
    // Add this callback which will be invoked after ProofPoint details modal shown. Give as much space as you like.
    onModalShown={() => bottomSheetRef.current?.snapToPosition('85%') }
  />
```

#### Error handling

You may want to handle cases when HTTP request fails due to network issues or similar. For this you could register the `onError` callback when you call `configure`.

```
import { configure } from "@provenance/react-native-provenance";

configure({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  bundleId: process.env.EXPO_PUBLIC_BUNDLE_ID,
  onError: (error: string|Error) => {
    // your custom error handling logic here...
    // report it to you error tracking software
    // or hide the container components etc.
  }
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
