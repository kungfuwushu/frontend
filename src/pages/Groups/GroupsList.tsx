import * as React from 'react';

import * as api from '../../api';
import { Group } from '../../types';

import GroupItem from './GroupItem'
import { Input, Button } from 'antd';
import { Card } from '../../components/custom';
import './GroupsList.css';

interface IGroupsListProps {
    match?: any;
    location?: any;
    classes?: any;
    history?: any;
}

interface IGroupsListState {
    groups: Group[];
    newGroupName: string;
}

export default class GroupsListPage extends React.Component<IGroupsListProps, IGroupsListState> {

    componentWillMount() {
        this.setState({
            groups: [],
            newGroupName: null
        }, () => {
            api.Groups.all()
                .then((groups: Group[]) => {
                    this.setState({
                      groups: groups,
                    })
                });
        });
    }

    private handleDelete(group: Group) {
        api.Groups.delete(group.id)
            .then(() => {
                this.setState({
                    groups: this.state.groups.filter(currentGroup => currentGroup.id !== group.id)
                });
            })
            .catch(() => {
                alert("La suppression a échoué");
            });
	}

    private handleInputChange = (event: any) => {
        this.setState({
            newGroupName: event.target.value
        });
    }

    private handleCreateGroup = (event: any) => {
        if (this.state.newGroupName) {
            let group: Group = {
                name: this.state.newGroupName,
                members: []
            };
            api.Groups.create(group)
                .then((res) => {
                    this.setState({
                        groups: this.state.groups.concat(res)
                    });
                })
                .catch(() => {
                    alert("L'ajout du groupe a échoué.");
                });
        }
    }

    public render(): JSX.Element {

        const groups = this.state.groups;
        const newGroupName = this.state.newGroupName;

        return (
    		<Card className="GroupsList">

                <div className="header">
    				<h2>Liste des Groupes</h2>
    			</div>

    			<div className="table-header">
    				<span className="name">Nom</span>
    			</div>

                <div className="NewGroup">
                    <Input
                        className="name"
                        placeholder="Nom du groupe"
                        onChange={this.handleInputChange}
                        value={newGroupName}
                    />
                    <Button
                        className="button"
                        onClick={this.handleCreateGroup}
                        type="primary"
                    >
                        Créer un nouveau groupe
                    </Button>
                </div>


              {groups.length < 1 ?
    				<span className="empty">Aucun résultat</span>
    				:
    				<div className="groups">
    					{groups.map((group, index) => (
                            <GroupItem
                                key={index}
    							group={group}
    							onDelete={() => this.handleDelete(group)}
    							className="item"
    						/>
    					))}
    				</div>
    			}
    		</Card>
        );
    }

}
