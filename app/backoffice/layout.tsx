import '../../public/plugins/fontawesome-free/css/all.min.css';
import '../../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
import '../../public/dist/css/adminlte.min.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className='hold-transition sidebar-mini layout-fixed'>
        <div className="wrapper">

        <Navbar></Navbar>
        <Sidebar></Sidebar>


  <div className="content-wrapper">
    <section className="content">
      <div className="container-fluid">
          {children}
      </div>
    </section>
  </div>
  {/* <footer className="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0
    </div>
  </footer>

  <aside className="control-sidebar control-sidebar-dark">
  </aside> */}
</div>
        </div>


        {/* <script src='dist/js/adminlte.js'></script> */}
        </>
    )
  }