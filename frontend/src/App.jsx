import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [hostelFilter, setHostelFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = players.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.sport.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sportFilter) {
      filtered = filtered.filter(player => player.sport === sportFilter);
    }

    if (hostelFilter) {
      filtered = filtered.filter(player => player.hostel === hostelFilter);
    }

    if (levelFilter) {
      filtered = filtered.filter(player => player.level === levelFilter);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'sport') return a.sport.localeCompare(b.sport);
        if (sortBy === 'level') return a.level.localeCompare(b.level);
        return 0;
      });
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, sportFilter, hostelFilter, levelFilter, sortBy]);

  const uniqueSports = [...new Set(players.map(p => p.sport))];
  const uniqueHostels = [...new Set(players.map(p => p.hostel))];
  const uniqueLevels = [...new Set(players.map(p => p.level))];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Player Database Portal</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name or sport"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}>
          <option value="">All Sports</option>
          {uniqueSports.map(sport => <option key={sport} value={sport}>{sport}</option>)}
        </select>
        <select value={hostelFilter} onChange={(e) => setHostelFilter(e.target.value)}>
          <option value="">All Hostels</option>
          {uniqueHostels.map(hostel => <option key={hostel} value={hostel}>{hostel}</option>)}
        </select>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          {uniqueLevels.map(level => <option key={level} value={level}>{level}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">No Sort</option>
          <option value="name">Sort by Name</option>
          <option value="sport">Sort by Sport</option>
          <option value="level">Sort by Level</option>
        </select>
      </div>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sport</th>
            <th>Hostel</th>
            <th>Achievements</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.sport}</td>
              <td>{player.hostel}</td>
              <td>{player.achievements}</td>
              <td>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
