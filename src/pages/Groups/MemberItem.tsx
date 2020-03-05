import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Member } from '../../types';

import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import './MemberItem.css';

const MemberItem: FC<{
    member: Member;
    onDelete: () => void;
    className: string;
}> = ({ member, onDelete, className }) => {
	return (
    	<div className={classNames("MemberItem", className)}>
            <img src={member.rank.image} />
            <div>
              <span className="name">{member.profile.firstName}</span>
              <span className="name">{member.profile.lastName}</span>
            </div>
            <span className="name">{member.profile.username}</span>
            <span className="name">{member.profile.email}</span>
    		<div className="actions">
                <Link to={`/`}>
                  <EditIcon className="edit" />
                </Link>
    			<DeleteIcon
    				className="delete"
    				onClick={onDelete}
    			/>
    		</div>
    	</div>
	);
}

export default MemberItem;
