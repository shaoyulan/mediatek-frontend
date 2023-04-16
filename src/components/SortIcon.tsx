import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'

const ascIconLookup: IconLookup = { prefix: 'fas', iconName: 'caret-up' }
const ascIconDefinition: IconDefinition = findIconDefinition(ascIconLookup)

const descIconLookup: IconLookup = { prefix: 'fas', iconName: 'caret-down' }
const desIconDefinition: IconDefinition = findIconDefinition(descIconLookup)

type Props = {
  sort: SortDirection;
}

export default function SortIcon({sort = ''}: Props) {

  let icon = null

  if ( sort === 'asc' ) icon = <FontAwesomeIcon icon={ascIconDefinition} />
  if ( sort === 'desc' ) icon = <FontAwesomeIcon icon={desIconDefinition} /> 

  return (
    <>
      {icon}
    </>
  )
}