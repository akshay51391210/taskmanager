import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const BidForm = ({ bids, setBids, editingBid, setEditingBid, projectId }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ amount: '', message: '' });

  useEffect(() => {
    if (editingBid) {
      setFormData({
        amount: editingBid.amount,
        message: editingBid.message,
      });
    } else {
      setFormData({ amount: '', message: '' });
    }
  }, [editingBid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBid) {
        const response = await axiosInstance.put(`/api/bids/${editingBid._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBids(bids.map((bid) => (bid._id === response.data._id ? response.data : bid)));
      } else {
        const response = await axiosInstance.post(`/api/bids/${projectId}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBids([...bids, response.data]);
      }
      setEditingBid(null);
      setFormData({ amount: '', message: '' });
    } catch (error) {
      alert('Failed to save bid.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingBid ? 'Edit Bid' : 'Place Bid'}</h1>
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingBid ? 'Update Bid' : 'Submit Bid'}
      </button>
    </form>
  );
};

export default BidForm;
