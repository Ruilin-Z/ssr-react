import _ from 'lodash';
import { cube ,square} from './math';
console.log(
    _.join(['Another', 'module', cube(4)], ' ')
  );
  