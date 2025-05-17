import React from "react";
import { Link, useParams } from "react-router-dom";

const BUPOTActionBar = ({ type, status, title, showCreateButton = true }) => {
  const { id, akun } = useParams();

  // Map types to their creation routes
  const createPaths = {
    bppu: `/praktikum/${id}/sistem/${akun}/bupot/bppu/create`,
    bpnr: `/praktikum/${id}/sistem/${akun}/bupot/bpnr/create`,
    ps: `/praktikum/${id}/sistem/${akun}/bupot/ps/create`,
    psd: `/praktikum/${id}/sistem/${akun}/bupot/psd/create`,
    bp21: `/praktikum/${id}/sistem/${akun}/bupot/bp21/create`,
    bp26: `/praktikum/${id}/sistem/${akun}/bupot/bp26/create`,
    bpa1: `/praktikum/${id}/sistem/${akun}/bupot/bpa1/create`,
    bpa2: `/praktikum/${id}/sistem/${akun}/bupot/bpa2/create`,
    bpbpt: `/praktikum/${id}/sistem/${akun}/bupot/bpbpt/create`,
  };

  // Button config based on status
  const showActionButtons = status === "draft";

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">
        {title || `EBUPOT ${type.toUpperCase()} NOT ISSUED`}
      </h1>
      <div className="flex space-x-2">
        {showCreateButton && showActionButtons && (
          <Link to={createPaths[type]}>
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              + Create eBupot {type.toUpperCase()}
            </button>
          </Link>
        )}

        {showActionButtons && (
          <>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              disabled
            >
              Hapus
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              disabled
            >
              Terbitkan
            </button>
          </>
        )}

        <button className="bg-white border px-4 py-2 rounded">
          XML Monitoring
        </button>
        <div className="relative">
          <button className="bg-white border px-4 py-2 rounded">
            Impor Data ▾
          </button>
        </div>
      </div>
    </div>
  );
};

export default BUPOTActionBar;
