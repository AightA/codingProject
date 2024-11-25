import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import './SubdivisionDisplay.css';

type DivisionData = {
	id: number;
	name: string;
	subdivisionStatusCode: string;
	county: string;
};

export const SubdivisionDisplay = () => {
	const [data, setData] = useState<DivisionData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [filterStatus, setFilterStatus] = useState({
		subdivisionStatusCode: 'All',
	});

	useEffect(() => {
		const divisionData = async () => {
			setLoading(true);
			setError(null);
			try {
				const query =
					filterStatus.subdivisionStatusCode !== 'All'
						? `subdivisionStatusCode=${filterStatus.subdivisionStatusCode}`
						: '';
				const response = await axios.get(
					`http://localhost:5000/subdivisions${query ? `?${query}` : ''}`
				);
				setData(response.data.subdivisions);
			} catch (error) {
				console.error('Error occurred:', error);
				setError('Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};
		divisionData();
	}, [filterStatus.subdivisionStatusCode]);

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFilterStatus({ subdivisionStatusCode: event.target.value });
	};

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>{error}</h1>;

	return (
		<div className="display-container">
			<h1>Divisions Data</h1>
			<div className="table-wrapper">
				<div>
					<label htmlFor="filter-drop-down">Filter by: </label>
					<select
						id="filter-drop-down"
						value={filterStatus.subdivisionStatusCode}
						onChange={handleFilterChange}
					>
						<option value="All">All</option>
						<option value="Active">Active</option>
						<option value="Future">Future</option>
						<option value="Builtout">Build Out</option>
					</select>
				</div>
				<table className="data-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>County</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.county}</td>
									<td>{item.subdivisionStatusCode}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
