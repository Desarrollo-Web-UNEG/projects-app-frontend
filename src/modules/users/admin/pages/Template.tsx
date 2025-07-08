import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CardInfo, Search } from "../components";
import { Book, Categ2, Language, Light, User } from "../assets";
import "../styles/template.css";
import { requestApi } from "@/modules/js/resquestApi";
import Modal from "../components/Modal";

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

  // Estado para usuarios pendientes
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para modal y usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado solo para GET de materias
  const [subjects, setSubjects] = useState<any[]>([]);
  const [judgements, setJudgements] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [technology, setTechnology] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);


useEffect(() => {
  if (!name) return;

  setLoading(true);
  const token = localStorage.getItem("access_token");

  if (name === "Aprobar Usuarios") {
    requestApi({
      url: "https://projects-app-backend.onrender.com/people/admin/pending",
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        setPendingUsers(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError("Error al cargar usuarios pendientes");
        setPendingUsers([]);
      })
      .finally(() => setLoading(false));
  }
  else if (name === "Materias") {
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
  }
  else if (name === "Criterios") {
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
  }
  else if (name === "Categorias") {
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
  }
  else if (name === "Tecnologias") {
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
  }
  else if (name === "Calificaciones") {
    requestApi({
      url: "https://projects-app-backend.onrender.com/scores",
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((data) => {
        setScores(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError("Error al cargar las calificaciones");
        setScores([]);
      })
      .finally(() => setLoading(false));
  }
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

  return (
  <>
    <NavBar />
    {name !== "Aprobar Usuarios" ? (
      <>
        <div>
          <div className="search-button-container">
            <div className="inside-control-search">
              <h2 className="st-h2">{name}</h2>
              <Search />
              <Button name={concat ?? ""} classComp="btn" />
            </div>
          </div>
          {name === "Materias" && subjects.map((subject, idx) => (
            <CardInfo
              key={idx}
              icon={icon ?? ""}
              title={subject.name}
              description={subject.description}
            />
          ))}
          {name === "Criterios" && judgements.map((judgement, idx) => (
            <CardInfo
              key={idx}
              icon={icon ?? ""}
              title={judgement.name || judgement.title}
              description={judgement.description}
            />
          ))}
          {name === "Categorias" && categories.map((category, idx) => (
            <CardInfo
              key={idx}
              icon={icon ?? ""}
              title={category.name}
              description={category.description}
            />
          ))}
          {name === "Tecnologias" && technology.map((tech, idx) => (
            <CardInfo
              key={idx}
              icon={icon ?? ""}
              title={tech.name}
              description={tech.description}
            />
          ))}
          {name === "Calificaciones" && scores.map((score, idx) => (
            <CardInfo
              key={idx}
              icon={icon ?? ""}
              title={`Calificación ${score.id || idx}`}
              description={`Valor: ${score.value}`}
            />
          ))}
          {!["Materias", "Criterios", "Categorias", "Tecnologias", "Calificaciones"].includes(name) && (
            <>
              <CardInfo icon={icon ?? ""} />
              <CardInfo
                icon={icon ?? ""}
                title="Título personalizado"
                description="Descripción personalizada"
              />
              <CardInfo icon={icon ?? ""} />
            </>
          )}
        </div>
      </>
      ) : (
        <>
          <div className="search-button-container">
            <div className="inside-control-search">
              <h2 className="st-h2">{name}</h2>
              <Search />
            </div>
          </div>
          {loading && <p>Cargando usuarios pendientes...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {pendingUsers.length === 0 && !loading && !error && (
            <p>No hay usuarios pendientes de aprobación.</p>
          )}
          {pendingUsers.map((user, idx) => (
            <CardInfo
              key={user.id || idx}
              icon={User ?? ""}
              isApprobated={true}
              rol_type={user.user_type || ""}
              title={user.name + " " + user.last_name || "Usuario"}
              description={user._email || ""}
              userId={user.id}
              onActionSuccess={removePendingUser}
              onClickApprove={() => handleOpenModal(user)}
            />
          ))}

          <Modal
            isOpen={isModalOpen}
            title="Confirmar acción"
            userData={{
              name: selectedUser?.name || "",
              lastName: selectedUser?.last_name || "",
              email: selectedUser?.email || "",
              phone: selectedUser?.phone || "",
              id: selectedUser?.id || "",
              role: selectedUser?.user_type === "professor" ? "Profesor" : "Estudiante",
              requestDate: new Date().toLocaleDateString(),
            }}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleApproveUser}
            onReject={handleRejectUser}
            confirmText="Aprobar"
            rejectText="Rechazar"
            cancelText="Cancelar"
          />
        </>
      )}
    </>
  );
};

export default Template;