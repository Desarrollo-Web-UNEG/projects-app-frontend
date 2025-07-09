import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CardInfo, Search } from "../components";
import { Book, Categ2, Language, Light, User } from "../assets";
import "../styles/template.css";
import { requestApi } from "@/modules/js/resquestApi";
import CreateModal from "../components/CreateModal";
import Modal from "../components/Modal";
import CreateCriteriaModal from "../components/CreateCriteriaModal";
import CreateTechnologyModal from "../components/CreateTechnologyModal";

const Template = () => {
  const iconMap: Record<string, string> = {
    Materias: Book,
    Criterios: Light,
    Tecnologias: Language,
    Categorias: Categ2,
  };

  const { name } = useParams();
  const icon = name ? iconMap[name] : null;
  const concat = "Crear " + name;

  // Estados para diferentes datos
  const [subjects, setSubjects] = useState<any[]>([]);
  const [judgements, setJudgements] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technology, setTechnology] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para modal y usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateCriteriaModalOpen, setIsCreateCriteriaModalOpen] = useState(false);
  const [isCreateTechnologyModalOpen, setIsCreateTechnologyModalOpen] = useState(false);



  useEffect(() => {
    if (!name) return;

    setLoading(true);
    const token = localStorage.getItem("access_token");

    const endpoints: Record<string, string> = {
      "Aprobar Usuarios": "https://projects-app-backend.onrender.com/people/admin/pending",
      "Materias": "https://projects-app-backend.onrender.com/subjects",
      "Criterios": "https://projects-app-backend.onrender.com/judgements",
      "Categorias": "https://projects-app-backend.onrender.com/categories",
      "Tecnologias": "https://projects-app-backend.onrender.com/technology",
      "Calificaciones": "https://projects-app-backend.onrender.com/scores",
    };

    const stateSetters: Record<string, React.Dispatch<React.SetStateAction<any[]>>> = {
      "Aprobar Usuarios": setPendingUsers,
      "Materias": setSubjects,
      "Criterios": setJudgements,
      "Categorias": setCategories,
      "Tecnologias": setTechnology,
      "Calificaciones": setScores,
    };

    const errorMessages: Record<string, string> = {
      "Aprobar Usuarios": "Error al cargar usuarios pendientes",
      "Materias": "Error al cargar las materias",
      "Criterios": "Error al cargar los criterios",
      "Categorias": "Error al cargar las categorías",
      "Tecnologias": "Error al cargar las tecnologías",
      "Calificaciones": "Error al cargar las calificaciones",
    };

    requestApi({
      url: endpoints[name],
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        stateSetters[name](Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError(errorMessages[name]);
        stateSetters[name]([]);
      })
      .finally(() => setLoading(false));
  }, [name]);

  // Quitar usuario de la lista tras aprobar/rechazar
  const removePendingUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Abrir modal con usuario seleccionado
  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Aprobar usuario
  const handleApproveUser = () => {
    const token = localStorage.getItem("access_token");
    if (!selectedUser) return;

    requestApi({
      url: `https://projects-app-backend.onrender.com/people/admin/${selectedUser.id}/approve`,
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(() => {
        removePendingUser(selectedUser.id);
      })
      .catch(() => {
        alert("Error al aprobar usuario");
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
  };

  // Rechazar usuario
  const handleRejectUser = () => {
    const token = localStorage.getItem("access_token");
    if (!selectedUser) return;

    requestApi({
      url: `https://projects-app-backend.onrender.com/people/admin/${selectedUser.id}/reject`,
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(() => {
        removePendingUser(selectedUser.id);
      })
      .catch(() => {
        alert("Error al rechazar usuario");
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
  };

  // Recargar materias luego de crear una nueva
  const handleCreateSubject = () => {
    const token = localStorage.getItem("access_token");
    setLoading(true);

    requestApi({
      url: "https://projects-app-backend.onrender.com/subjects",
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        setSubjects(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError("Error al cargar las materias");
        setSubjects([]);
      })
      .finally(() => setLoading(false));
  };

  // Recargar categorías luego de crear una nueva
const handleCreateCategory = () => {
  const token = localStorage.getItem("access_token");
  setLoading(true);

  requestApi({
    url: "https://projects-app-backend.onrender.com/categories",
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
    .then((data) => {
      setCategories(Array.isArray(data) ? data : []);
      setError(null);
    })
    .catch(() => {
      setError("Error al cargar las categorías");
      setCategories([]);
    })
    .finally(() => setLoading(false));
};

const handleCreateCriteria = () => {
  const token = localStorage.getItem("access_token");
  setLoading(true);

  requestApi({
    url: "https://projects-app-backend.onrender.com/judgements",
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
    .then((data) => {
      setJudgements(Array.isArray(data) ? data : []);
      setError(null);
    })
    .catch(() => {
      setError("Error al cargar los criterios");
      setJudgements([]);
    })
    .finally(() => setLoading(false));
};

const handleCreateTechnology = () => {
  const token = localStorage.getItem("access_token");
  setLoading(true);

  requestApi({
    url: "https://projects-app-backend.onrender.com/technology",
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
    .then((data) => {
      setTechnology(Array.isArray(data) ? data : []);
      setError(null);
    })
    .catch(() => {
      setError("Error al cargar las tecnologías");
      setTechnology([]);
    })
    .finally(() => setLoading(false));
};

  // Renderizar sección de Materias
  const renderMateriasSection = () => (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">Materias</h2>
          <Search />
          <Button
            name="Crear Materias"
            classComp="btn"
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </div>

      {loading && <p>Cargando materias...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && subjects.length === 0 && (
        <p>No hay materias registradas.</p>
      )}

      {subjects.map((subject, idx) => (
        <CardInfo
          key={idx}
          icon={Book}
          title={subject.name}
          description={subject.description}
        />
      ))}

      {/* Modal para crear materia */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSubject}
        title="Crear Nueva Materia"
        endpoint="https://projects-app-backend.onrender.com/subjects"
      />
    </div>
  );

  // Renderizar sección de Criterios
const renderCriteriosSection = () => (
  <div>
    <div className="search-button-container">
      <div className="inside-control-search">
        <h2 className="st-h2">Criterios</h2>
        <Search />
        <Button
          name="Crear Criterios"
          classComp="btn"
          onClick={() => setIsCreateCriteriaModalOpen(true)}
        />
      </div>
    </div>

    {loading && <p>Cargando criterios...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    {!loading && !error && judgements.length === 0 && (
      <p>No hay criterios registrados.</p>
    )}

    {judgements.map((judgement, idx) => (
      <CardInfo
        key={idx}
        icon={Light}
        title={judgement.name || judgement.title}
        description={judgement.description}
      />
    ))}

    {/* Modal para crear criterio */}
    <CreateCriteriaModal
      isOpen={isCreateCriteriaModalOpen}
      onClose={() => setIsCreateCriteriaModalOpen(false)}
      onSuccess={handleCreateCriteria}
      title="Crear Nuevo Criterio"
      endpoint="https://projects-app-backend.onrender.com/judgements"
    />
  </div>
);

  // Renderizar sección de Categorías
  const renderCategoriasSection = () => (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">Categorías</h2>
          <Search />
          <Button
            name="Crear Categorías"
            classComp="btn"
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </div>

      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && categories.length === 0 && (
        <p>No hay categorías registradas.</p>
      )}

      {categories.map((category, idx) => (
        <CardInfo
          key={idx}
          icon={Categ2}
          title={category.name}
          description={category.description}
        />
      ))}

      {/* Modal para crear categoría */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateCategory}
        title="Crear Nueva Categoría"
        endpoint="https://projects-app-backend.onrender.com/categories"
      />
    </div>
  );

  // Renderizar sección de Tecnologías
const renderTecnologiasSection = () => (
  <div>
    <div className="search-button-container">
      <div className="inside-control-search">
        <h2 className="st-h2">Tecnologías</h2>
        <Search />
        <Button
          name="Crear Tecnologías"
          classComp="btn"
          onClick={() => setIsCreateTechnologyModalOpen(true)}
        />
      </div>
    </div>

    {loading && <p>Cargando tecnologías...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    {!loading && !error && technology.length === 0 && (
      <p>No hay tecnologías registradas.</p>
    )}

    {technology.map((tech, idx) => (
      <CardInfo
        key={idx}
        icon={Language}
        title={tech.name}
      />
    ))}

    {/* Modal para crear tecnología */}
    <CreateTechnologyModal
      isOpen={isCreateTechnologyModalOpen}
      onClose={() => setIsCreateTechnologyModalOpen(false)}
      onSuccess={handleCreateTechnology}
      title="Crear Nueva Tecnología"
      endpoint="https://projects-app-backend.onrender.com/technology"
    />
  </div>
);

  // Renderizar sección de Calificaciones
  const renderCalificacionesSection = () => (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">Calificaciones</h2>
          <Search />
          <Button name="Crear Calificaciones" classComp="btn" />
        </div>
      </div>
      {scores.map((score, idx) => (
        <CardInfo
          key={idx}
          icon={icon ?? ""}
          title={`Calificación ${score.id || idx}`}
          description={`Valor: ${score.value}`}
        />
      ))}
    </div>
  );

const renderAprobarUsuariosSection = () => (
  <div>
    <div className="search-button-container">
      <h2 className="st-h2">Usuarios Pendientes</h2>
    </div>
    {pendingUsers.length === 0 && <p>No hay usuarios pendientes.</p>}
    {pendingUsers.map((user, idx) => (
      <CardInfo
        key={idx}
        icon={User}
        title={user.name}
        description={user.email}
        rol_type={user.role}
        userId={user.id}
        isApprobated={true} // Importante para mostrar botones y detalles
        onClickApprove={() => handleOpenModal(user)}
        onActionSuccess={(userId) => removePendingUser(userId)}
      />
    ))}

    {/* Modal para aprobar/rechazar usuario */}
    {isModalOpen && selectedUser && (
      <Modal
        isOpen={isModalOpen}
        title="Aprobar Usuario"
        userData={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleApproveUser}
        onReject={handleRejectUser}
        confirmText="Aprobar"
        rejectText="Rechazar"
        cancelText="Cancelar"
      />
    )}
  </div>
);

  // Renderizar sección por defecto
  const renderDefaultSection = () => (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">{name}</h2>
          <Search />
          <Button name={concat ?? ""} classComp="btn" />
        </div>
      </div>
      <CardInfo icon={icon ?? ""} />
      <CardInfo
        icon={icon ?? ""}
        title="Título personalizado"
        description="Descripción personalizada"
      />
      <CardInfo icon={icon ?? ""} />
    </div>
  );

  return (
    <>
      <NavBar />
      {name === "Materias" && renderMateriasSection()}
      {name === "Criterios" && renderCriteriosSection()}
      {name === "Categorias" && renderCategoriasSection()}
      {name === "Tecnologias" && renderTecnologiasSection()}
      {name === "Calificaciones" && renderCalificacionesSection()}
      {name === "Aprobar Usuarios" && renderAprobarUsuariosSection()}
      {![
        "Materias",
        "Criterios",
        "Categorias",
        "Tecnologias",
        "Calificaciones",
        "Aprobar Usuarios",
      ].includes(name ?? "") && renderDefaultSection()}
    </>
  );
};

export default Template;