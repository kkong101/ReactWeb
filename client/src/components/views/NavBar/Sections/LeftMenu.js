
import {Menu} from 'antd';
import { MailOutlined} from '@ant-design/icons';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
        <Menu.Item key="mail" icon={<MailOutlined />}>
            <a href="/">Home</a>
        </Menu.Item>
        <SubMenu title={<span>Blogs</span>}>
            <MenuItemGroup title="Item1">
                <Menu.Item key="setting:1"> Option 1 </Menu.Item>
                <Menu.Item key="setting:2"> Option 2 </Menu.Item>
            </MenuItemGroup>

            <Menu.Item title="Item2">
                <Menu.Item key="setting:3"> Option 3</Menu.Item>
                <Menu.Item key="setting:4"> Option 4</Menu.Item>
            </Menu.Item>
        </SubMenu>
        </Menu>
    )
}

export default LeftMenu