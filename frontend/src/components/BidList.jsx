import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BidList = ({ bids, setBids, setEditingBid }) => {
  const { user } = useAuth();

  const handleDelete = async (bidId) => {
    try {
      await axiosInstance.delete(`/api/bids/${bidId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBids(bids.filter((bid) => bid._id !== bidId));
    } catch (error) {
      alert('Failed to delete bid.');
    }
  };

  return (
    <div>
      {bids.map((bid) => (
        <div key={bid._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">Amount: ${bid.amount}</h2>
          <p>{bid.message}</p>
          <p className="text-sm text-gray-500">
            Submitted by: {bid.user?.name || 'Unknown'}
          </p>
          <div className="mt-2">
            <button
              onClick={() => setEditingBid(bid)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(bid._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidList;
