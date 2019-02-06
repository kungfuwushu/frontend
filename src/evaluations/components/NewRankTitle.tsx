import * as React from 'react';
import NewRank from './NewRank';

export const NewRankTitle: React.StatelessComponent<{}> = () => {
  return (
    <div className="row">
      <h1>Création d'un Grade</h1>
      <NewRank/>
    </div>
  );
}
