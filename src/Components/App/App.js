import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack = (track) => {
    let newArr = this.state.playlistTracks.filter(x =>  x.id !== track.id);

    this.setState({ playlistTracks: newArr });
  }

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name });
  }

  savePlaylist = () => {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({ 
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      })
    
  }

  search(term) {
    Spotify.search(term).then(response => {
      this.setState({ searchResults: response })
    })
    
  }
  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            
          <SearchResults searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
