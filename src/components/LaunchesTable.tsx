import { useQuery, gql } from "@apollo/client"
import moment from 'moment'
import SortIcon from "./SortIcon"
import Spinner from "./Spinner"
import NoData from "./NoData"
import ErrorAlert from "./ErrorAlert"
import Pagination from 'rsuite/Pagination'
import { useState, useEffect } from "react"
import { isValidKey } from "@/lib/utils"
import { useContext } from "react"
import { TableMetaContext } from "@/context/TableMetaContext"

type Props = {
  keyword: string;
  startDate: string;
  endDate: string;
  tableMeta: object;
}

type LaunchRecord = {
  id: string;
  mission_name: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  launch_date_local: string;
}

type PostData = {
  launches: LaunchRecord[];
}

type LaunchRecordFlat = {
  id: string;
  mission_name: string;
  rocket_name: string;
  rocket_type: string;
  launch_date_local: string;
}

export default function LaunchesTable({keyword = '', startDate = '', endDate = '', tableMeta = {}}: Props) {
  const ITEMS_PER_PAGE: number = 20
  const QUERY = gql`
    query Query {
      launches {
        id
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
        launch_date_local
      }
    }
  `
  const { data, loading, error, fetchMore } = useQuery<PostData>(QUERY)
  const [list, setList] = useState<LaunchRecordFlat[] | []>([])
  const [activeColumn, setActiveColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<SortDirection>("")
  const [activePage, setActivePage] = useState(1)

  function processData(data:PostData){
    const source = data?.launches || []
    const processed = source.map(item => {
      return {
        id: item.id,
        mission_name: item?.mission_name,
        rocket_name: item?.rocket?.rocket_name,
        rocket_type: item?.rocket?.rocket_type,
        launch_date_local: item?.launch_date_local,
      }
    })
    setList(processed)
  }

  // 以字串比較排序
  function compareByString(a:string, b:string, direction:string): number{
    let A = a.toUpperCase()
    let B = b.toUpperCase()

    if (direction === "asc") {
      return A.localeCompare(B)
    } else {
      return B.localeCompare(A)
    }
  }

  // 以日期比較排序
  function compareByDate(a:string, b:string, direction:string): number{
    const ascResult = new Date(a).getTime() - new Date(b).getTime()

    if (direction === "asc") {
      return ascResult
    } else {
      return ascResult == 0 ? 0 : -ascResult
    }
  }

  function handleSort(column:string){
    const direction = activeColumn !== column ? "asc" : sortDirection === "asc" ? "desc" : "asc"
    const sortedData = [...list].sort((a, b) => {

      if ( isValidKey(column, a) ) {

        if ( column == 'launch_date_local' ) { 
          return compareByDate(a[column], b[column], direction)
        } 
        
        return compareByString(a[column], b[column], direction)
      }

      return 0
    })
    setList(sortedData)
    setActiveColumn(column)
    setSortDirection(direction)
    setActivePage(1)
  };


  useEffect(() => {
    setActivePage(1)
  }, [keyword, startDate, endDate])

  useEffect(() => {
    if ( data ){
      processData(data)
    }
  }, [data])

  if (loading) {
    return (
      <Spinner />
    )
  }

  if (error) {
    console.error(error)
    return (
      <ErrorAlert />
    )
  }

  const column = [
    { name: 'mission_name', label: 'Mission Name' },
    { name: 'rocket_name', label: 'Rocket Name' },
    { name: 'rocket_type', label: 'Rocket Type' },
    { name: 'launch_date_local', label: 'Launch Date' },
  ]

  const filteredList = list.filter((item) =>{
    const text = [
      item.mission_name || '',
      item.rocket_name || '',
      item.rocket_type || '',
    ].map(v=>v.toLowerCase()).join(' ')

    const keywordPass = text.includes(keyword.toLowerCase())
    const startDatePass = startDate ? moment(item.launch_date_local).isSameOrAfter(moment(startDate), 'day') : true
    const endDatePass = endDate ? moment(item.launch_date_local).isSameOrBefore(moment(endDate), 'day') : true

    return keywordPass && startDatePass && endDatePass
  })

  const pagedList = filteredList.slice((activePage - 1) * ITEMS_PER_PAGE, activePage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)

  return (
    <>
      <TableMetaContext.Provider value={tableMeta}>
        <div className="launches-table-block">
          <div className="launches-table-wrap">
            <table className="launches-table">
              <thead>
                <tr>
                  {
                    column.map((item) => {
                      return (
                        <th key={item.name} onClick={() => handleSort(item.name)}>
                          {item.label}
                          {activeColumn === item.name ? <SortIcon sort={sortDirection}/> : ""}
                        </th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  pagedList.map((item) => {
                    return (
                      <tr key={item.id} >
                        <td>{item.mission_name || ''}</td>
                        <td>{item.rocket_name || ''}</td>
                        <td>{item.rocket_type || ''}</td>
                        <td>{item.launch_date_local ? moment(item.launch_date_local).format('YYYY/MM/DD') : ''}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className="record-info">Total Rows: {filteredList.length}</div>
            { !pagedList.length && !loading ? <NoData /> : '' }
          </div>
          {
            totalPages > 1 ?
              <Pagination
                prev
                last
                next
                first
                size="md"
                total={filteredList.length}
                limit={ITEMS_PER_PAGE}
                activePage={activePage}
                onChangePage={setActivePage}
              /> : ''
          }
        </div>
      </TableMetaContext.Provider>
    </>
  )
}