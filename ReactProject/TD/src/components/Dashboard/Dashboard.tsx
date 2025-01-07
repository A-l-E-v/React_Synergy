import { Tab, Tabs } from 'react-bootstrap';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Рабочий стол</h1>
            <Tabs defaultActiveKey="product" id="uncontrolled-tab-example">
                <Tab eventKey="product" title="Product">
                    {/* Содержимое вкладки Product */}
                </Tab>
                <Tab eventKey="backlog" title="Backlog">
                    {/* Содержимое вкладки Backlog */}
                </Tab>
            </Tabs>
        </div>
    );
};

export default Dashboard;
