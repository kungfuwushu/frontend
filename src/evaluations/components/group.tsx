import { Layout, Menu } from 'antd';
import { Row, Col } from 'antd';
import * as React from 'react';

const {
    Content
} = Layout;
  
export const GroupEvaluation: React.StatelessComponent<{}> = () => {
    const students = [
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
        'ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine','ximeng', 'johan', 'tiphaine',
    ];

    const exercises = [
        'exercice1', 'exercice2', 'exercice3','exercice4'
    ]

    return (
        <div className="GroupEvaluation">
            <h1>Evaluation en cours : Petit Panda, Groupe2</h1>
            <Row gutter={8}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} style={{backgroundColor: '#d9d9d9' ,overflowY:"scroll",overflowX:"hidden", height:screen.height}}>
                        {students.map((student, index) => {
                            return (
                                <Menu.Item key={index}>
                                    <span className="nav-text">{student}</span>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} style={{backgroundColor: '#d9d9d9' }}>
                        {exercises.map((exercice, index) => {
                            return (
                                <Menu.Item key={index}>
                                    <span className="nav-text">{exercice}</span>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Content style={{overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                        ...
                        <br />
                        Really
                        <br />...<br />...<br />...<br />
                        long
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />...
                        <br />...<br />...<br />...<br />...<br />...<br />
                        content
                        </div>
                    </Content>
                </Col>
            </Row>
        </div>
    );
}