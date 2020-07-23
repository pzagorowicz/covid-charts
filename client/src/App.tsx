import React from 'react';
import './App.css';
import { callApi } from './callApi';
import { Province, ProvinceData } from './types';
import { ProvinceList } from './ProvinceList/ProvinceList';

type AppState = {
  provinces: Province[],
  selectedProvince: string,
  provinceData: ProvinceData[]
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    provinces: [],
    selectedProvince: '',
    provinceData: []
  };

  componentDidMount() {
    callApi<{ provinces: Province[] }>('/api/provinces')
      .then(res => this.setState({ provinces: res.provinces }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <ProvinceList
            provinces={this.state.provinces}
            selectProvince={(id) => this.selectProvince(id)}
            selectedProvince={this.state.selectedProvince}
          />
        </div>
      </div>
    );
  }

  selectProvince(id: number) {
    const province = this.state.provinces[id].content;
    this.setState({ selectedProvince: province });

    callApi<{ data: ProvinceData[] }>('/api/dataByProvince?province=' + province)
      .then(res => this.setState({ provinceData: res.data }))
      .catch(err => console.log(err));
  }
}

export default App;
