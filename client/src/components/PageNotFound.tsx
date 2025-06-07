import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          {/* 404 Animation */}
          <div className="relative h-[400px] bg-no-repeat bg-center bg-contain"
               style={{
                 backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)'
               }}>
            
          </div>
               <h1 className=" text-8xl font-bold text-primary">
              404
            </h1>
          {/* Content */}
          <div className="mt-8 space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            <div className="mt-8">
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;