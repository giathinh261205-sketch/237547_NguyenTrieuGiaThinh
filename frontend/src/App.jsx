import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/devices';

function App() {
  const [devices, setDevices] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', status: 'Active', classroom: '' });
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách thiết bị
  const fetchDevices = async () => {
    try {
      const res = await axios.get(API_URL);
      setDevices(res.data);
    } catch (err) {
      console.error('Lỗi lấy dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Xử lý gửi form (Thêm / Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', type: '', status: 'Active', classroom: '' });
      setEditingId(null);
      fetchDevices();
    } catch (err) {
      console.error('Lỗi lưu dữ liệu:', err);
    }
  };

  // Xóa thiết bị
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchDevices();
      } catch (err) {
        console.error('Lỗi xóa:', err);
      }
    }
  };

  // Đưa dữ liệu vào form để sửa
  const handleEdit = (device) => {
    setForm(device);
    setEditingId(device._id);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Quản Lý Thiết Bị Phòng Học - Nguyễn Triệu Gia Thịnh (237547)</h2>
      
      {/* Form Thêm/Sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>{editingId ? 'Cập Nhật Thiết Bị' : 'Thêm Thiết Bị Mới'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Tên thiết bị (VD: Máy chiếu)" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            placeholder="Loại (VD: Điện tử)" 
            value={form.type} 
            onChange={(e) => setForm({ ...form, type: e.target.value })} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            placeholder="Phòng học (VD: A101)" 
            value={form.classroom} 
            onChange={(e) => setForm({ ...form, classroom: e.target.value })} 
            required 
            style={{ padding: '8px' }}
          />
          <select 
            value={form.status} 
            onChange={(e) => setForm({ ...form, status: e.target.value })} 
            style={{ padding: '8px' }}
          >
            <option value="Active">Hoạt động (Active)</option>
            <option value="Maintenance">Bảo trì (Maintenance)</option>
            <option value="Inactive">Ngừng dùng (Inactive)</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editingId ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => { setEditingId(null); setForm({ name: '', type: '', status: 'Active', classroom: '' }); }}
            style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Hủy
          </button>
        )}
      </form>

      {/* Danh sách thiết bị */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Tên thiết bị</th>
            <th>Loại</th>
            <th>Phòng học</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {devices.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có thiết bị nào</td></tr>
          ) : (
            devices.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.classroom}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: '5px', padding: '4px 8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                  <button onClick={() => handleDelete(item._id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;