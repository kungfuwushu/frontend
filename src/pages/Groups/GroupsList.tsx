import * as React from 'react';

import * as api from '../../api';
import { Group } from '../../types';

import GroupItem from './GroupItem'
import { Button } from 'antd';
import { Card, Loading } from '../../components/custom';
import './GroupsList.css';

interface IGroupsListProps {
    match?: any;
    location?: any;
    classes?: any;
    history?: any;
}

interface IGroupsListState {
    groups: Group[];
}

export default class GroupsListPage extends React.Component<IGroupsListProps, IGroupsListState> {

    componentWillMount() {
        this.setState({
            groups: null
        }, () => {
            api.Groups.all()
            .then((groups: Group[]) => {
                this.setState({
                  groups: groups,
                })
            });
        });
    }

    private setGroups(groups: Group[]) {
        this.setState({
            ...this.state,
            groups
        });
    }

    private handleDelete = (groupId: number) => () => {
    	api.Groups.delete(groupId)
            .then(() => {
                this.setGroups(this.state.groups.filter(group => group.id !== groupId))
            })
            .catch(() => {
                alert("La suppression a échoué");
            });
	}

    public render(): JSX.Element {

        const history = this.props.history;
        const groups = this.state.groups;

        if (!groups)
            return <Loading />;

        return (
    		<Card className="GroupsList">
    			<div className="header">
    				<h2>Groupes</h2>
    				<Button
    					onClick={() => history.push('/new-group')}
    					type="primary"
    				>
    					Créer un nouveau groupe
    				</Button>
    			</div>
    			<div className="table-header">
    				<span className="name">Nom</span>
    			</div>
              {groups.length < 1 ?
    				<span className="empty">Aucun résultat</span>
    				:
    				<div className="groups">
    					{groups.map(group => (
                            <GroupItem
                                key={group.id}
    							group={group}
    							onDelete={this.handleDelete(group.id)}
    							className="item"
    						/>
    					))}
    				</div>
    			}
    		</Card>
        );
    }

}
