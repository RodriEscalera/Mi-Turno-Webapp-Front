import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useMediaQuery from "../Hooks/useMediaQuery";
import { useNavigate } from "react-router";

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
    <div className="bg-white flex justify-center">
      <div className="h-[30rem] flex items-center flex-col">
        <div className="w-[100%] text-left ml-[2rem] mt-[2rem]">
          <h1 className="font-roboto font-bold justify-start">Sucursales</h1>
        </div>
        <InfiniteScroll
          className="w-[65rem] max-[1024px]:w-[50rem]  max-[768px]:w-[35rem] max-[560px]:w-[20rem] mb-5"
          loader=""
          hasMore={hasMore}
          dataLength={branches.length}
          next={handleScroll}
          height={"30rem"}
          scrollableTarget="scrollableDiv"
        >
          {branches.length !== 0
            ? branches.map((sucursal: any) =>
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

                        <div className="text-start">
                          <p className="text-grey8">Capacidad máxima</p>
                          <p className="text-black">2</p>
                        </div>

                        <div className="text-start">
                          <p className="text-grey8">
                            Horario de inicio y cierre
                          </p>
                          <p className="text-black">{`${sucursal.startingTime} - ${sucursal.closingTime}`}</p>
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
                )
              )
            : null}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Branches;
