import * as React from 'react';
import NewInformation from './NewInformation';
//import NewRankTitle from './NewRankTitle';


export const NewEvaluation: React.StatelessComponent<{}> = () => {
  return (
    <div className="row">
      <h1>Planification d'une nouvelle évaluation</h1>
      <NewInformation/>
      {/*<NewRankTitle/>*/}
    </div>
  );
}