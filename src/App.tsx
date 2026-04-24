import AppRoutes from './router/AppRoutes'
import { LocalStorageGuard }  from './rbac'
import { Toaster } from './component/ui/sonner'

function App() {
  return (
    <LocalStorageGuard>
      <AppRoutes />
      <Toaster />
    </LocalStorageGuard>
  )
}

export default App;