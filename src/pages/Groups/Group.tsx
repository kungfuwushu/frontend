import * as React from 'react';

import * as api from '../../api';
import { Member, Group } from '../../types';

import MemberItem from './MemberItem'
import { Button } from 'antd';
import { Card, Loading } from '../../components/custom';
import './Group.css';

interface IGroupProps {
    match?: any;
    location?: any;
    classes?: any;
    history?: any;
}

interface IGroupState {
    members: Member[];
    group: Group;
}

export default class GroupPage extends React.Component<IGroupProps, IGroupState> {

    componentWillMount() {
        this.setState({
            members: null
        }, () => {
            api.Groups.byId(this.props.match.params.id)
            .then((group: Group) => {
                console.log(group);
                this.setGroup(group);
                this.setMembers(group.members);
            });
        });
    }

    private setGroup(group: Group) {
        this.setState({
            ...this.state,
            group
        });
    }


    private setMembers(members: Member[]) {
        this.setState({
            ...this.state,
            members
        });
    }

    private handleDelete = (memberId: number) => () => {
    	api.Groups.delete(memberId)
            .then(() => {
                this.setMembers(this.state.members.filter(member => member.id !== memberId))
            })
            .catch(() => {
                alert("La suppression a échoué");
            });
	}

    public render(): JSX.Element {

        // const history = this.props.history;
        const members = this.state.members;
        const group = this.state.group;

        if (!members)
            return <Loading />;

        return (
    		<Card className="Group">
    			<div className="header">
    				<h2>Membres du groupe "{group.name}"</h2>
    				<Button
    					onClick={() => console.log("ajout d'un pratiquant au groupe")}
    					type="primary"
    				>
    					Ajouter un pratiquant
    				</Button>
    			</div>
    			<div className="table-header">
                    <span className="image"></span>
                    <span className="name">Nom</span>
                    <span className="username">Pseudo</span>
    				<span className="email">Email</span>
    			</div>
              {members.length < 1 ?
    				<span className="empty">Aucun membre dans ce groupe</span>
    				:
    				<div className="members">
    					{members.map(member => (
                            <MemberItem
                                key={member.id}
    							member={member}
    							onDelete={this.handleDelete(member.id)}
    							className="item"
    						/>
    					))}
    				</div>
    			}
    		</Card>
        );
    }

}
