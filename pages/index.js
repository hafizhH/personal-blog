import Head from 'next/head';

export default function Home() {
    return (
    <div>
    <Head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Hello, world!</title>
    </Head>

    <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Home</a>
          </div>
        </div>

        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline" type="submit">Search</button>
        </form>
      </div>
    </nav>

  <header className="py-5 mb-0">
      <div className="container">
          <div className="text-center my-5">
              <h1 className="fw-bolder">Welcome to My Blog!</h1>
              <p className="lead mb-0">Enjoy :)</p>
          </div>
      </div>
  </header>

  <main className="mt-0 pt-5">
    <div className="container">
      <section className="text-center">
        <h4 className="mb-5"><strong>Latest posts</strong></h4>

          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" className="img-fluid" />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Post title</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                      Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                    </p>
                    <a href="#!" className="btn btn-primary">Read</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/023.jpg" className="img-fluid" />
                  <a href="#!">
                    <div className="mask"></div>
                      </a>
                    </div>
                  <div className="card-body">
                    <h5 className="card-title">Post title</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                      Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                    </p>
                    <a href="#!" className="btn btn-primary">Read</a>
                  </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" className="img-fluid" />
                  <a href="#!">
                    <div className="mask"></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Post title</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                      Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                    </p>
                    <a href="#!" className="btn btn-primary">Read</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/002.jpg" className="img-fluid" />
                  <a href="#!">
                    <div className="mask"></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Post title</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                    Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                  </p>
                  <a href="#!" className="btn btn-primary">Read</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/022.jpg" className="img-fluid" />
                  <a href="#!">
                  <div className="mask"></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Post title</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                    Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                  </p>
                  <a href="#!" className="btn btn-primary">Read</a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://mdbootstrap.com/img/new/standard/nature/035.jpg" className="img-fluid" />
                  <a href="#!">
                    <div className="mask"></div>
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Post title</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae dolores minima iste. 
                    Ullam quas iste nostrum porro eum at sequi quia quam id. Magni quo quibusdam culpa aut officiis.
                  </p>
                  <a href="#!" className="btn btn-primary">Read</a>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  </main>

    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
    </nav>
    </div>
    );
}