import { useState } from "react";
import { useContextMenu } from "react-contexify";
import styled from "styled-components";
import ContextMenu, { contextMenuId } from "./ContextMenu";
const StyledList = styled.section`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	& .content {
		width: 600px;
		& ul {
			list-style-type: none;
			padding: 0;
			& li {
				align-items: center;
				border-radius: 8px;
				border: 1px solid #cccccc;
				display: flex;
				font-size: 17px;
				height: 40px;
				margin: 0 0 4px 0;
				padding: 0 15px;
			}
		}
	}
`;
const App = () => {
	const [brands, setBrands] = useState([
		{ name: "Apple", id: 1 },
		{ name: "Samsung", id: 2 },
		{ name: "Lenovo", id: 3 },
		{ name: "HP", id: 4 },
		{ name: "DELL", id: 5 },
		{ name: "ASUS", id: 6 },
	]);
	const [brandId, setBrandId] = useState(0);
	const onContext = useContextMenu({
		id: contextMenuId,
	});
	const onContextMenu = (event, id) => {
		setBrandId(id);
		onContext.show({
			event,
			props: {
				key: "value",
			},
		});
	};
	const onClick = type => {
		switch (type) {
			case "COPY":
				const brand = brands.find(({ id }) => id === brandId)?.name;
				navigator.clipboard.writeText(brand);
				break;
			case "EDIT":
				const edit = brands.find(({ id }) => id === brandId);
				console.log(edit);
				break;
			case "DELETE":
				const newBrands = brands.filter(({ id }) => id !== brandId);
				setBrands(newBrands);
				break;
			case "SHARE":
				const share = brands.find(({ id }) => id === brandId);
				console.log(share);
				break;
			default:
				return;
		}
	};
	return (
		<StyledList>
			<div className="content">
				<h1 style={{ textAlign: "center" }}>
					React context menu with react-contexify
				</h1>
				<div style={{ textAlign: "center" }}>
					<a href="https://github.com/hayitmurod707/context-menu">
						Github
					</a>
				</div>
				<ul>
					{brands.map(({ name, id }, index) => (
						<li onContextMenu={e => onContextMenu(e, id)} key={index}>
							{name}
						</li>
					))}
				</ul>
				<ContextMenu onClick={onClick} />
			</div>
		</StyledList>
	);
};
export default App;
