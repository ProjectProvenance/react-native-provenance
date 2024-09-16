export const offersSuccess = () => ({
  trustBadge: {
    backgroundColor: '#dedede',
    variant: 'proofpoints',
  },
  bundle: {
    autoRenderBundle: true,
  },
  proofPoints: [
    {
      iconHTML:
        '<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 44 44" class="Capsule-iconInner" preserveAspectRatio="xMaxYMax meet">\n    <g fill="none" fill-rule="evenodd" stroke="#2A2A2A">\n        <path d="M28.4 18.103c-3.456-.39-6.31 5.143-6.31 5.143s1.377-5.012 4.565-7.076c3.188-2.063 4.621.044 6.125-2.552a3.805 3.805 0 0 1-.48 3.769c-1.57 2.296-4.429 4.425-7.532 3.628"></path>\n        <path d="M22.09 23.246s1.377-5.012 4.565-7.076c3.188-2.063 4.621.044 6.125-2.552a3.805 3.805 0 0 1-.48 3.769c-1.57 2.296-4.429 4.425-7.532 3.628M22.089 23.247a36.074 36.074 0 0 0-1.699 8.192S19.386 21.742 9.41 13.412c0 0 9.199 1.064 10.62 10.404"></path>\n    </g>\n</svg>\n',
    },
    {
      iconHTML:
        '<img class="ProofPointIcon" width="32" src="https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_64/6v6mhfd5n93zoip8dvidzkw0kumo" />',
    },
    {
      iconHTML:
        '<img class="ProofPointIcon" width="32" src="https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_64/f0ltte5bqins65r24v8aqxsn4qaq" />',
    },
    {
      iconHTML:
        '<img class="ProofPointIcon" width="32" src="https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_64/yoq5mw8w2lduwkcdqvldiiqa9t10" />',
    },
  ],
});

export const offersNoProofPoints = () => ({
  trustBadge: {
    backgroundColor: '#dedede',
    variant: 'proofpoints',
  },
  bundle: {
    autoRenderBundle: true,
  },
  proofPoints: [],
});
