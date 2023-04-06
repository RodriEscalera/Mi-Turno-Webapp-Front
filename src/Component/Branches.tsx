import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useMediaQuery from "../Hooks/useMediaQuery";
import { useNavigate } from "react-router";
import vacio from "../assets/image/void.png";

function Branches() {
  const [branches, setbranches] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [idBranch, setIdBranch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    bringFirst();
  }, []);

  const bringFirst = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/branches/branches/${page}`
    );
    setbranches(data);
  };

  const handleScroll = async () => {
    setPage(page + 1);

    const { data } = await axios.get<any, any>(
      `http://localhost:3001/api/branches/branches/${page + 1}`
    );
    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setbranches(branches.concat(data));
  };

  const query = useMediaQuery("(max-width:560px)");

  const editFunction = (id: any) => {
    setIdBranch(id);

    navigate(`/updateBranch?branchId=${id}`);
  };

  return (
    <section className="bg-gray-100 h-screen w-full p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-roboto text-xl font-semibold p-2 mt-3 mb-3 text-start ">
          Sucursales
        </h1>

        <InfiniteScroll
          // className="w-[65rem] max-[1024px]:w-[50rem]  max-[768px]:w-[35rem] max-[560px]:w-[20rem] mb-5"
          loader=""
          hasMore={hasMore}
          dataLength={branches.length}
          next={handleScroll}
          height={"32.5rem"}
          scrollableTarget="scrollableDiv"
        >
          {branches.length !== 0 ? (
            branches.map((sucursal: any) =>
              query ? (
                <>
                  <div className="border-gray-300 border-solid border-2 h-[5rem] w-[99%] rounded-xl mt-3">
                    <div className="flex justify-around h-[100%] items-center">
                      <div className="text-start">
                        <p className="text-grey8">Nombre</p>
                        <p className="text-black">
                          {sucursal.name.slice(0, 7) + "..."}
                        </p>
                      </div>
                      <div className="text-start">
                        <p className="text-grey8">Mail</p>
                        <p className="text-black">
                          {sucursal.email.slice(0, 7) + "..."}
                        </p>
                      </div>
                      <div>
                        <button
                          className="bg-violetSecondary text-violet font-semibold font-roboto py-2 px-4 rounded"
                          onClick={() => editFunction(sucursal._id)}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap p-2 lg:w-full md:w-1/2">
                    <div className="justify-between w-full flex items-center border-gray-200 border p-6 rounded-lg">
                      <div className="w-full grid grid-cols-1 lg:flex lg:flex-wrap lg:justify-between">
                        <div className="text-start w-1/5">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Nombre
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {sucursal.name}
                          </p>
                        </div>
                        <div className="text-start w-1/5">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Mail
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            {sucursal.email}
                          </p>
                        </div>

                        <div className="text-start w-1/5">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Capacidad máxima
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">
                            12
                          </p>
                        </div>

                        <div className="text-start w-1/5">
                          <h2 className="text-grey8 font-roboto font-normal text-xs leading-4">
                            Horario de inicio y cierre
                          </h2>
                          <p className="text-sm font-roboto font-semibold leading-4">{`${sucursal.startingTime} - ${sucursal.closingTime}`}</p>
                        </div>

                        <div>
                          <button
                            className="bg-violetSecondary hover:bg-violetSecondaryHover text-violet font-semibold font-roboto rounded px-3 py-1.5 text-center inline-flex items-center"
                            onClick={() => editFunction(sucursal._id)}
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            )
          ) : (
            <div className="flex w-full items-center font-roboto text-2xl justify-center">
              <div className="mt-16">
                <img className=" w-60 h-80 object-cover" src={vacio} alt="" />{" "}
              </div>
              <p className="text">Aún no hay Sucursales registradas</p>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}

export default Branches;
