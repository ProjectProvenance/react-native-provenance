import { render, screen } from '@testing-library/react-native';
import { ClaimsList } from '@src/trustBadge/ClaimsList';
import React from 'react';
import { PixelRatio } from 'react-native';

const validImageUrl = (number: number) => `https://cdn.io/img${number}`;

const image1 = validImageUrl(1);
const image2 = validImageUrl(2);
const image3 = validImageUrl(3);
const image4 = validImageUrl(4);

jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1);

describe('with empty claimsIcons', () => {
  it('shows provenance logo only', () => {
    render(<ClaimsList claimsIcons={[]} />);

    expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
      expect.objectContaining({ width: 34 })
    );
    expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(0);
    expect(screen.queryAllByLabelText('More claims')).toHaveLength(0);
    expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(1);
  });
});

describe('with one claimIcon', () => {
  it('shows the claim icon', () => {
    render(<ClaimsList claimsIcons={[image1]} />);

    expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
      expect.objectContaining({ width: 34 })
    );
    expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(1);
    expect(screen.queryAllByLabelText('More claims')).toHaveLength(0);
    expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
  });
});

describe('with 2 claimIcons', () => {
  it('shows both claim icons', () => {
    render(<ClaimsList claimsIcons={[image1, image2]} />);

    expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
      expect.objectContaining({ width: 60 })
    );
    expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
    expect(screen.queryAllByLabelText('More claims')).toHaveLength(0);
    expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
  });
});

describe('with 3 claimIcons', () => {
  it('shows both claim icons', () => {
    render(<ClaimsList claimsIcons={[image1, image2, image3]} />);

    expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
      expect.objectContaining({ width: 86 })
    );
    expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(3);
    expect(screen.queryAllByLabelText('More claims')).toHaveLength(0);
    expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
  });
});

describe('with more than 3', () => {
  it('shows 2 claimIcons and More claims with the number', () => {
    render(<ClaimsList claimsIcons={[image1, image2, image3, image4]} />);

    expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
      expect.objectContaining({ width: 86 })
    );
    expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
    expect(screen.queryAllByLabelText('More claims')).toHaveLength(1);
    expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
    expect(screen.getByTestId('ClaimsListContainer')).toHaveTextContent('+2');
  });
});

describe('with unsupported icons', () => {
  describe('whith single svg', () => {
    it('shows logo and more claims', () => {
      render(<ClaimsList claimsIcons={['<svg>1</svg>']} />);

      expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
        expect.objectContaining({ width: 60 })
      );
      expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(0);
      expect(screen.queryAllByLabelText('More claims')).toHaveLength(1);
      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(1);
      expect(screen.getByTestId('ClaimsListContainer')).toHaveTextContent('+1');
    });
  });

  describe('with multiple svgs', () => {
    it('shows logo and more claims', () => {
      render(<ClaimsList claimsIcons={['1', '2']} />);

      expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
        expect.objectContaining({ width: 60 })
      );
      expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(0);
      expect(screen.queryAllByLabelText('More claims')).toHaveLength(1);
      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(1);
      expect(screen.getByTestId('ClaimsListContainer')).toHaveTextContent('+2');
    });
  });

  describe('alongside the supported ones', () => {
    it('shows claims icons and the More claims number', () => {
      render(
        <ClaimsList
          claimsIcons={[image1, '<svg></svg>', image2, image3, '<svg>2</svg>']}
        />
      );

      expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
        expect.objectContaining({ width: 86 })
      );
      expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
      expect(screen.queryAllByLabelText('More claims')).toHaveLength(1);
      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
      expect(screen.getByTestId('ClaimsListContainer')).toHaveTextContent('+3');

      render(<ClaimsList claimsIcons={[image1, '<svg></svg>', image2]} />);
      expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
        expect.objectContaining({ width: 86 })
      );
      expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
      expect(screen.queryAllByLabelText('More claims')).toHaveLength(1);
      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
      expect(screen.getByTestId('ClaimsListContainer')).toHaveTextContent('+1');
    });
  });

  describe('when font scale increased', () => {
    it('calculates the dimensions properly', () => {
      jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(2);

      render(<ClaimsList claimsIcons={[]} />);

      expect(screen.getByTestId('ClaimsListContainer').props.style).toEqual(
        expect.objectContaining({ width: 51 })
      );
    });
  });
});
