import { useEffect, useState, type FormEvent } from 'react';
import { Header } from '../components/Header';
import { generatePopup } from '../../utils/popup';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import type { IProduct, Category, IVariant } from '../interfaces/Iproduct';
import '../css/Home.css';


const CATEGORIES: Category[] = ["Running", "Urban", "Training", "Basketball"];
const SIZES = [36, 37, 38, 39, 40, 41, 42];
const COLORS = ["Blanco", "Negro", "Gris", "Rojo", "Azul", "Multicolor", "Beige"];

const INITIAL_FORM = { name: '', price: 0, description: '', category: CATEGORIES[1] };

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);


  const [formData, setFormData] = useState(INITIAL_FORM);
  const [variantsList, setVariantsList] = useState<IVariant[]>([]);


  const [currentVariant, setCurrentVariant] = useState({
    number: SIZES[0],
    color: COLORS[1],
    quantity: 1
  });

  const { token } = useAuth();

  const fetchAll = async () => {
    if (!token) return;
    const res = await getProducts(token);
    if (res.success) setProducts(res.data as IProduct[]);
  };

  const handleAddVariant = () => {
    if (currentVariant.quantity <= 0) return;

    const exists = variantsList.findIndex(v => v.number === currentVariant.number && v.color === currentVariant.color);

    if (exists !== -1) {
      const updated = [...variantsList];
      updated[exists].quantity += currentVariant.quantity;
      setVariantsList(updated);
    } else {
      setVariantsList([...variantsList, { ...currentVariant, isAvailable: true }]);
    }
    setCurrentVariant({ ...currentVariant, quantity: 1 });
  };

  const removeVariant = (index: number) => {
    setVariantsList(variantsList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (variantsList.length === 0) {
      return generatePopup({ textTitle: "Atención", textContent: "Agregá al menos un talle y color", icon: "warning" });
    }

    const finalProduct = {
      ...formData,
      stock: variantsList.reduce((acc, v) => acc + v.quantity, 0),
      variants: variantsList
    };

    const res = editingId
      ? await updateProduct(editingId, finalProduct as Partial<IProduct>, token!)
      : await createProduct(finalProduct as Partial<IProduct>, token!);

    if (res.success) {
      generatePopup({ textTitle: editingId ? "¡Actualizado!" : "¡Creado!", icon: "success" });
      fetchAll();
      handleClose();
    }
  };

  const handleEdit = (p: IProduct) => {
    setEditingId(p._id);
    setFormData({ name: p.name, price: p.price, description: p.description, category: p.category });
    setVariantsList(p.variants);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setVariantsList([]);
  };

  useEffect(() => { fetchAll(); }, [token]);

  return (
    <div className="home-container">
      <Header />
      <main id="catalog" className="catalog-section">
        <div className="header-actions">
          <div className="title-group">
            <h1>Panel de Inventario</h1>
            <p className="subtitle">{products.length} Modelos cargados en el sistema</p>
          </div>
          <button className="btn-add-product" onClick={() => setShowForm(true)}>+ Nuevo Modelo</button>
        </div>

        {showForm && (
          <div className="form-overlay">
            <div className="product-form retro-card">
              <form onSubmit={handleSubmit}>
                <h2>{editingId ? 'Actualizar Sneakers' : 'Cargar Sneakers'}</h2>

                <div className="form-group">
                  <input placeholder="Nombre del modelo" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className="form-row">
                  <input type="number" placeholder="Precio ($)" value={formData.price || ''}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} required />
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as Category })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="inventory-builder">
                  <label className="label-title">Configurar Talles y Colores:</label>
                  <div className="variant-inputs-row">
                    <select value={currentVariant.number} onChange={e => setCurrentVariant({ ...currentVariant, number: Number(e.target.value) })}>
                      {SIZES.map(s => <option key={s} value={s}>Talle {s}</option>)}
                    </select>
                    <select value={currentVariant.color} onChange={e => setCurrentVariant({ ...currentVariant, color: e.target.value })}>
                      {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input type="number" placeholder="Cant." value={currentVariant.quantity}
                      onChange={e => setCurrentVariant({ ...currentVariant, quantity: Number(e.target.value) })} />
                    <button type="button" onClick={handleAddVariant} className="btn-plus-variant">+</button>
                  </div>

                  <div className="variants-preview-list">
                    {variantsList.length === 0 && <small className="empty-msg">No hay combinaciones cargadas.</small>}
                    {variantsList.map((v, i) => (
                      <div key={i} className="variant-item-form">
                        <span><strong>{v.color}</strong> - T{v.number} ({v.quantity} un.)</span>
                        <button type="button" onClick={() => removeVariant(i)} className="btn-remove-variant">x</button>
                      </div>
                    ))}
                  </div>
                </div>

                <textarea placeholder="Descripción del modelo..." value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })} />

                <div className="form-actions">
                  <button type="submit" className="btn-submit">{editingId ? 'Guardar Cambios' : 'Publicar Producto'}</button>
                  <button type="button" className="btn-cancel" onClick={handleClose}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-grid">
          {products.map(p => (
            <div key={p._id} className="product-card">
              <div className="card-main-body">
                <div className="info-side">
                  <span className="badge-category">{p.category}</span>
                  <h3 className="product-title">{p.name}</h3>  
                
                  <p className="product-stock-total">
                    Stock Disponible: <strong>{p.variants.reduce((acc, v) => acc + v.quantity, 0)}</strong> un.
                  </p>

                  <p className="product-price">${p.price.toLocaleString()}</p>
                  <p className="product-description-text">{p.description}</p>

                  <div className="variants-grid-display">
                    {p.variants.map((v, i) => (
                      <div key={i} className="variant-pill">
                        <span className="pill-size">T{v.number}</span>
                        <span className="pill-color">{v.color}</span>
                        <span className="pill-stock">({v.quantity})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="image-side">
                  <div className="placeholder-img">👟</div>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn-edit-action" onClick={() => handleEdit(p)}>✏️ Editar</button>
                <button className="btn-delete-action"
                  onClick={async () => {
                    const confirm = await generatePopup({ textTitle: "¿Eliminar modelo?", icon: "warning", showCancelButton: true });
                    if (confirm.isConfirmed) { await deleteProduct(p._id, token!); fetchAll(); }
                  }}
                >
                  Borrar 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export { Home };