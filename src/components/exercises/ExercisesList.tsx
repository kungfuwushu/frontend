import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd';
import { Card, Loading, SearchInput } from '../custom';
import * as api from '../../api';
import { Exercise } from '../../types';
import ExerciseItem from './ExerciseItem';
import './ExercisesList.css';

const ExercisesList: FC<{
    history: any
}> = ({ history }) => {
	const [ exercises, setExercises ] = useState<Array<Exercise>>([]);
  const [ filteredExercises, setFilteredExercises ] = useState([]);
  const [ filter, setFilter ] = useState({
		search: undefined,
	});

	useEffect(() => {
		api.Exercises.all()
			.then((exercises: Exercise[]) => {
				setExercises(exercises);
        setFilteredExercises(exercises);
			});
	}, []);

	const handleDelete = (exerciseId: number) => () => {
		api.Exercises.delete((exerciseId))
    .then(() => {
      setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
    })
    .catch(() => {
      alert("La suppression a échoué");
    });
	}

	useEffect(() => {
		setFilteredExercises(exercises.filter(exercise => {
			if (filter.search &&
         !exercise.name.toLowerCase().includes(filter.search.toLowerCase()) &&
         !exercise.description.toLowerCase().includes(filter.search.toLowerCase()) &&
         !exercise.type.toLowerCase().includes(filter.search.toLowerCase()))
				return false;
			return true;
		}));
	}, [filter]);

  const handleFilterChange = (filterName: any) => (value: any) => {
		const data = {...filter};
		data[filterName] = value;
		setFilter(data);
	}

  if (!exercises)
      return <Loading />;

	return (
		<Card className="ExercisesList">
			<div className="header">
				<h2>Exercices</h2>
        <div className="filter">
          <SearchInput
            onSearch={handleFilterChange("search")}
            placeholder="Rechercher par nom, description, catégorie..."
          />
        </div>
        <div className="top">
  				<Button
  					onClick={() => history.push('/new-exercise')}
  					type="primary"
  				>
  					Créer un nouvel exercice
  				</Button>
        </div>
			</div>
			<div className="table-header">
        <span className="image"></span>
				<span className="name">Nom</span>
        <span className="description">Description</span>
				<span className="category">Catégorie</span>
			</div>
      {exercises.length < 1 ?
				<span className="empty">Aucun résultat</span>
				:
				<div className="exercises">
					{filteredExercises.map((exercise, index) => (
            <ExerciseItem
              key={index}
							exercise={exercise}
							onDelete={handleDelete(exercise.id)}
							className="item"
						/>
					))}
				</div>
			}
		</Card>
	);
}

export default ExercisesList;
