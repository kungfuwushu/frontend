import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Group } from '../../types';

import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import './GroupItem.css';

const GroupItem: FC<{
    group: Group;
    onDelete: () => void;
    className: string;
}> = ({ group, onDelete, className }) => {
	return (
    	<div className={classNames("GroupItem", className)}>
            <span className="name">{group.name}</span>
            <span className="name">{`${group.members.length} membre${group.members.length > 1 ? 's' : '' }`}</span>
    		<div className="actions">
                <Link to={`/group/${group.id}/edit`}>
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

export default GroupItem;
