# react-native-provenance

Library to add [Provenance](https://provenance.org) experiences into your mobile applications to validate sustainability credentials of products you sell.

The package provides Trust Badge and Bundle components. Both are meant to be shown on your product page. Trust Badge as a quick indication that a product
has sustainability claims. Buyers can click on it to further see details in the Bundle component.

## Installation

Dependencies:
* `react-native-webview` should be installed to your application first. Make sure it matches the version specified in the package.json of this package.

Steps:
1. Make sure react-native-webview is installed: `npx expo install react-native-webview@^13.10.3`.
2. Install the package `npm install @provenance/react-native-provenance --save`. The `--save` option is [important for autolinking](https://reactnative.dev/docs/linking-libraries-ios#automatic-linking).
3. Run `npx expo run:android --no-build-cache` to to ensure native dependencies are linked. After this `npx expo start` works as usual.

Note, despite the steps mention Expo, the expo is not necessary, vanilla react-native with `npm` or `yarn` should work as well.

### Common issues

#### RNCWebView module could not be found

Use developers build. First, run `npx expo run:android --no-build-cache`. After the error message disappeared, you can start emulator with `npx expo run:android` and switch between the build types from Expo CLI menu.

## Usage

There are 2 ways how to integrate Provenance components.
* The easiest one: by using our built in modal
* Allows more customizations: by using Trust Badge and Bundle separately

In both cases you will need `bundleId` and `productSku` - use the same values you may already received from our support team or from your
retail website.

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

        <TrustBadge bundleId={bundleId} sku={productSku} />

        <ProductDescription>
            Indulge in the pure essence of nature with our premium organic apples.
        </ProductDescription>
    </View>
  );
}
```

You may already have established UI patterns to handle overlays, for instance, your modal component or some `BottomSheet` library that you want to use as
a container for the Bundle. If this is the case, check the next section.

### Using Trust Badge and Bundle with your overlay

This method allows you to use any overlay component that you wish but requires more configuration.

[See demo gif](docs/assets/DrawerDemo2024-07-24%20at%2013.05.14.gif)

```typescript
// import your UI components: ProductTitle, ProductPrice etc...
// @gorhom/bottom-sheet is just an example library, you can choose any
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Bundle, TrustBadge } from "@provenance/react-native-provenance";

export function ProductPage () {
  const [sheetShown, setSheetShown] = useState(false);
  const [bundleContainerHeight, setBundleContainerHeight] = useState(175);
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

        <TrustBadge onPress={handleTrustBadgePress} overlay={false} bundleId={bundleId} sku={productSku} />

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
                            bundleId={bundleId}
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
