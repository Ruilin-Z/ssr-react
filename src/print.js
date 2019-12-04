import _ from 'lodash';
import { cube ,square} from './math.js';
export default () => {
  console.log(
    _.join(['Button Clicked', 'module', 'loaded!',cube(8)], ' ')
  );
}