import AssessmentResult from '../AssessmentResult.tsx';

export default {
	path: 'result',
	getComponent(nextState,cb){
		cb(null,AssessmentResult);
	}
}