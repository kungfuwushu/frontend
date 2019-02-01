import * as React from 'react'
import { IPhysicalEvaluationProps } from '../../actions/PhysicalEvaluation.Actions';

interface PhysicalEvaluationProps extends IPhysicalEvaluationProps {
	//setSave: (save:()=>void) => void
}
class PhysicalEvaluation extends React.Component<PhysicalEvaluationProps>{
    
    componentDidMount() {
		//this.props.setSave(this.save);
	}

    render(){
        const { rankExercise } = this.props;
        return (
           	<div className="PhysicalEvaluation">
           		<input type="text" name="score" />/{rankExercise.measurementUnit}
          	</div>
        );
    }
}

export default PhysicalEvaluation;