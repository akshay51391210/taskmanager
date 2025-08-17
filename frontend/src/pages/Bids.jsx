// src/pages/Bids.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import BidForm from "../components/BidForm";
import BidList from "../components/BidList";

const Bids = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [editingBid, setEditingBid] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axiosInstance.get("/api/bids", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBids(response.data);
      } catch (error) {
        alert("Failed to fetch bids.");
      }
    };

    if (user?.token) fetchBids();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <BidForm
        bids={bids}
        setBids={setBids}
        editingBid={editingBid}
        setEditingBid={setEditingBid}
      />
      <BidList bids={bids} setBids={setBids} setEditingBid={setEditingBid} />
    </div>
  );
};

export default Bids;
