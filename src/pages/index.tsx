import { ApolloProvider } from "@apollo/client"
import client from "@/lib/apolloClient"
import LaunchesTable from "@/components/LaunchesTable"
import DateRangePicker from 'rsuite/DateRangePicker'
import 'rsuite/dist/rsuite.min.css'
import { Input, InputGroup, Button, Container } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import { useState } from "react"

export default function Home() {
  const [keyword, setKeyword] = useState("")

  const styles = {
    width: 230,
    marginBottom: 10
  }

  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null)
  const [startDate, endDate] = dateRange ? dateRange : [null, null]

  function handleSearch(value:string, event: React.ChangeEvent){
    setKeyword(value)
  };

  function onChange(dates: [Date, Date] | null){
    setDateRange(dates)
  };

  function clearSearch(){
    setKeyword("")
    setDateRange(null)
  }

  function formatDate(date: Date|null): string{
    if ( !date ) return ''
    return date.toISOString()
  }

  return (
    <ApolloProvider client={client}>
      <Container>
        <div className="content">
          <h1 className="page-title">
          SpaceX Launch Records
          </h1>
          <div className="search-toolbar">
            <InputGroup style={styles}>
              <Input onChange={handleSearch} value={keyword} placeholder="Keyword"/>
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
            <DateRangePicker 
              appearance="default" 
              placeholder="Date Range" 
              style={{ width: 230 }} 
              format="yyyy/MM/dd"
              value={dateRange}
              onChange={onChange}
            />
            <Button appearance="primary" onClick={clearSearch}>Clear</Button>
          </div>
            <LaunchesTable 
              keyword={keyword} 
              startDate={formatDate(startDate)} 
              endDate={formatDate(endDate)}
              tableMeta={{ targetReaders: ['Elon Musk']}}
            />
        </div>
      </Container>
    </ApolloProvider>
  )
}
