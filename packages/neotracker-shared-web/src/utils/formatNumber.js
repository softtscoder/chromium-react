/* @flow */
import BigNumber from 'bignumber.js';

type Options = {|
  decimalPlaces?: number,
  trimZerosUnsafe?: boolean,
|};
export default (number: number | string, optionsIn?: Options): string => {
  const options = optionsIn || {};
  const value = new BigNumber(number);
  const decimalPlaces =
    options.decimalPlaces == null
      ? value.decimalPlaces()
      : options.decimalPlaces;
  return options.trimZerosUnsafe
    ? // This is unsafe because if value.decimalPlaces(decimalPlaces) is null it will throw uncaught error
      value.decimalPlaces(decimalPlaces).toString()
    : value.toFormat(decimalPlaces);
};
