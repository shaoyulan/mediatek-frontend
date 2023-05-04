import { createContext } from 'react'

type context = {
  targetReaders?: string[];
}

export const TableMetaContext = createContext<context>({
  targetReaders: ['John Doe']
})