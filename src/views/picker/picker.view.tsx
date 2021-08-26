import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PickerSearch from 'src/components/picker-search/picker.search';
import PickerList from 'src/components/picker-list/picker.list';
import { debounce } from 'src/lib/utils';
import { cancelCurrentRequest, getAutocompleteSuggestions, getStockDetails } from 'src/actions/data.action';
import PickerLoader from 'src/components/picker-loader/picker.loader';
import ErrorMessage from 'src/components/error-message/error.message';
import PickerCard from 'src/components/picker-card/picker.card';
import useRefreshInterval from 'src/lib/useRefresh';
import { Button, Form, Modal } from 'react-bootstrap';
import useStoredValue from 'src/lib/useStoredValue';
import "./picker.view.scss";


const PickerView:React.FC<{}> = ({}) => {
  const [isLoading, setLoading] = useState(false);
  const [autoList, setAutoList] = useState([]);
  const [isAutoListFlag, setAutoListFlag] = useState(false);
  const [isError, setError] = useState(false);
  const [stockItem, setStockItem] = useState({});
  const [timer, setTimer] = useState(5000);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isAutoRefresh, setAutoRefresh] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState("");

  useEffect(() => {
    return () => {
      //need to check this
      cancelCurrentRequest();
    };
  },[]);

  useRefreshInterval(()=> {
    calculateStockDetails(currentSymbol);
  }, timer, isAutoRefresh);

  const storeValues = useStoredValue(currentSymbol);

  const showSymbolSuggestions = useCallback(debounce((val:string)=>{
    setAutoList([]);
    checkAutoListFlag(val);
    setError(false);
    if(val.length < 1) {
      return;
    }
    getAutocompleteSuggestions({keyword:val.toUpperCase()})
    .then((resp) => {
      const data = resp["data"] && resp["data"]["bestMatches"];
      if(data.length) {
        setAutoList(data);
      }else {
        checkAutoListFlag("");
        setError(true);
      }
    }).
    catch((e)=>{
      console.log('check this exception: ',e);
    })
  },500),[])

  const showSymbolSummary = (key: string) => {
    setCurrentSymbol(key);
    setAutoListFlag(false);
    setLoading(true);
    calculateStockDetails(key);
  }

  const checkAutoListFlag = (val) => {
    if(!isAutoListFlag && val.length > 0) {
      setAutoListFlag(true);
    } else {
      setAutoListFlag(false)
    }
  }

  const calculateStockDetails = (key) => {
    getStockDetails({keyword:key.toUpperCase()})
    .then((resp)=>{
      const resp1 = resp[0].data;
      const resp2 = resp[1].data;
      buildStockItem(resp1, resp2);
      setLoading(false);
    })
    .catch((e)=>{
      setStockItem({});
      console.log('see this exception', e);
    })
  }

  const buildStockItem = (resp1: any, resp2: any) => {
    if(!resp1 || !resp2) {
      setStockItem({});
      return;
    }
    const newItem = {
      symbol: resp1['Symbol'],
      name: resp1['Name'],
      description : resp1['Description'],
      industry: resp1['Industry'],
      pe: resp1['PERatio'],
      cap: resp1['MarketCapitalization'],
      currentPrice: resp2["Global Quote"] && resp2["Global Quote"]["05. price"],
      change: resp2["Global Quote"] && resp2["Global Quote"]["05. price"] && (resp2["Global Quote"]["05. price"] - resp2["Global Quote"]["08. previous close"])
    }
    setStockItem(newItem);
  }

  const buildPickerList = useMemo(() => {
    const list = autoList.map((item) => {
      return {
        key: item["1. symbol"],
        value: item["2. name"]
      }
    });
    return list;
  },[autoList]);

  return (
    <>
    <Container fluid="md" onClick={()=>{setAutoListFlag(false)}}>
      <Row md={3}>
        <Col md={12}>
          <div className="right-align">
            <Form>
            <Button disabled={!isAutoRefresh} size="sm" onClick={(evt)=>{setIsRefresh(true)}}>Set Refresh Interval</Button>
            <Form.Check type="switch" id="custom-switch" label="Allow auto refresh" inline={true} onChange={() => {
              setAutoRefresh(!isAutoRefresh);
            }} />
            </Form>
          </div>
        </Col>
      </Row>
      <Row md={3}>
        <Col md={3}>
        </Col>
        <Col md={6}>
          <PickerSearch placeholder="Enter Stock Symbol" onFocus={(evt, val)=> {
              val && checkAutoListFlag(val);
            }
          } onChange={(evt, val)=> {
              val && showSymbolSuggestions(val);
            }
          } onEnter={(evt, val)=>{
              val && showSymbolSummary(val);
          }} />
          {
            isAutoListFlag && (autoList.length > 0 ?
            <div className="auto-list">
              <PickerList list={buildPickerList} onClick={showSymbolSummary} />
            </div> : <PickerLoader />)
          }
          {isError && <ErrorMessage onClose={()=>{
            setError(false)
          }} />}
        </Col>
        <Col md={3}>
        </Col>
      </Row>
      {
        !isLoading ? (Object.keys(stockItem).length > 0 && <StockDetail stockItem={stockItem} /> ) : <PickerLoader /> }
    </Container>
    <RefreshModal show={isRefresh} handleClose={()=>{setIsRefresh(false)}} valueCallback={(timer)=>{
      setTimer(timer*1000)
    }} />
    </>
  )
}

const StockDetail = ({stockItem}) => {
  return (
    <Row md={3}>
          <Col md={3}>
            <PickerCard title="Symbol" value={stockItem["symbol"]} />
          </Col>
          <Col md={3}>
            <PickerCard title="Name" value={stockItem["name"]} />
          </Col>
          <Col md={2}>
            <PickerCard title="Industry" value={stockItem["industry"]} />
          </Col>
          <Col md={3}>
            <PickerCard title="PE Ratio" value={stockItem["pe"]} />
          </Col>
          <Col md={2}>
            <PickerCard title="Market Capital" value={stockItem["cap"]} />
          </Col>
          <Col md={2}>
            <PickerCard title="Current Price" value={stockItem["currentPrice"]} />
          </Col>
          <Col md={2}>
            <PickerCard title="Change" value={stockItem["change"]} />
          </Col>
          <Col md={3}>
            <PickerCard title="Description" value={stockItem["description"]} />
          </Col>
          {/* <Col md={2}>
            <PickerCard title="MatchScore" value={stockItem["9. matchScore"]} />
          </Col> */}
      </Row>
  )
}

const RefreshModal = ({show, handleClose, valueCallback}) => {
  const [value, setValue] = useState(5000);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set Refresh Interval(in msec)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" onChange={(evt)=>{setValue(Number(evt.target.value))}} value={value} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>{
          valueCallback(value);
          setValue(5000);
          handleClose();
        }}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PickerView;

