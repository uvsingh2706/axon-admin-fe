import AppRoutes from './router/AppRoutes'
import { LocalStorageGuard }  from './rbac'

function App() {
  return (
    <LocalStorageGuard>
      <AppRoutes />
    </LocalStorageGuard>
  )
}

export default App;