import * as React from 'react';
import NewInformation from './NewInformation';

export const NewEvaluation: React.StatelessComponent<{}> = () => {
  return (
    <div className="row">
      <h1>Planification d'une nouvelle évaluation</h1>
      <NewInformation/>
    </div>
  );
}