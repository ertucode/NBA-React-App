import { useState } from "react";
import TextInputField from "./TextInputField";
import PlayerLinkList from "./PlayerLinkList";
import ListNumbers from "./ListNumbers";
import getPlayersHelper from "../../utils/getPlayersHelper";

export default function SearchPlayerBox() {
	const [players, setPlayers] = useState([]);
	const [loadPlayers, setLoadPlayers] = useState(false);
	const [searchParam, setSearchParam] = useState();
	const [totalPageNumber, setTotalPageNumber] = useState(1);

	async function getPlayers(searchParam, pageNumber) {
		setLoadPlayers(true);

		getPlayersHelper.call(
			null,
			setPlayers,
			searchParam,
			pageNumber,
			setTotalPageNumber
		);
	}

	return (
		<div className="search-player-box box-container">
			<TextInputField
				buttonName="Search"
				onClickCallback={(val) => {
					setSearchParam(val);
					getPlayers(val, 1);
				}}
				loadPlayers={loadPlayers}
			/>
			<div className="player-list-container">
				<PlayerLinkList
					players={players}
					setLoadPlayers={setLoadPlayers}
				/>
				{totalPageNumber !== 1 && (
					<ListNumbers
						count={totalPageNumber}
						searchParam={searchParam}
						getPlayersAtPage={(searchParam, pageNumber) => {
							getPlayers(searchParam, pageNumber);
						}}
					/>
				)}
			</div>
		</div>
	);
}
