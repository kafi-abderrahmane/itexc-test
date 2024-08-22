import { Suspense, FC, ReactElement } from "react";

// project import
import Loader from "./Loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoadableProps {
  [key: string]: any;
}

const Loadable: <T extends LoadableProps>(Component: FC<T>) => FC<T> =
  <T extends LoadableProps>(Component: FC<T>): FC<T> =>
  (props: T): ReactElement =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
