import * as React from 'react';

import * as api from '../../api';
import { Member, Group } from '../../types';

import MemberItem from './MemberItem'
import { Card, Loading } from '../../components/custom';
import './Group.css';

import MemberPicker from './MemberPicker.jsx';


interface IGroupProps {
    match?: any;
    location?: any;
    classes?: any;
    history?: any;
}

interface IGroupState {
    members: Member[];
    availableMembers: Member[];
    group: Group;
}

export default class GroupPage extends React.Component<IGroupProps, IGroupState> {

    componentWillMount() {
        this.setState({
            members: null,
            availableMembers: []
        }, () => {
            api.Groups.byId(this.props.match.params.id)
                .then((group: Group) => {
                    this.setGroup(group);
                    this.setMembers(group.members);
                });

            api.Members.all()
                .then((members: Member[]) => {
                    this.setState({
                        ...this.state,
                        availableMembers: members.filter(member => !member.groupId)
                    });
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

    private setAvailableMembers(availableMembers: Member[]) {
        this.setState({
            ...this.state,
            availableMembers
        });
    }

    private handleMembersPicked(pickedMembers: any[]) {
        // add members picked to group
        pickedMembers.forEach(pickedMember => {
            var member = pickedMember.member;
            api.Members.updateGroup(member.id, this.state.group.id)
                .then(() => {
                    // local update
                    member.groupId = this.state.group.id;
                    this.setMembers(this.state.members.concat(member));
                    this.setAvailableMembers(this.state.availableMembers.filter(member => !member.groupId));
                })
                .catch((err) => {
                    alert("Impossible d'ajouter le membre au groupe...")
                });
        });
    }

    private handleDelete = (member: Member) => () => {
    	api.Members.deleteGroup(member.id)
            .then(() => {
                this.setMembers(this.state.members.filter(currentMember => currentMember.id !== member.id));
                this.setAvailableMembers(this.state.availableMembers.concat(member));
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
                    <MemberPicker
                        availableMembers={this.state.availableMembers}
                        onPicked={(members: any[]) => this.handleMembersPicked(members)}
                    />
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
    							onDelete={this.handleDelete(member)}
    							className="item"
    						/>
    					))}
    				</div>
    			}
    		</Card>
        );
    }

}
