
import { BannerAdmin } from "@/modules/users/admin/assets"
import { Banner, NavBar } from "../components"
import "../styles/profile.css"
import { getProfile, getSubjectPeople } from "../services/catalogServices"
import { useEffect, useState } from "react"

const Profile = () => {

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true); // 2. Estado para manejar carga
    const [subjectPeople, setSubjectPeople] = useState<any[]>([]);
    const token = localStorage.getItem("access_token") || "";
  
   // Primer useEffect para el perfil
useEffect(() => {
  
    
    const fetchProfile = async () => {
        try {
            const profileData = await getProfile(token);
            setProfile(profileData);
        } catch (err) {
            alert("Error al obtener el perfil");
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, []);

// Segundo useEffect para las materias (se ejecuta cuando profile.id cambia)
useEffect(() => {
    if (!profile?.id) return; // No hacer nada si no hay ID
    
    const fetchSubjects = async () => {
        try {
            const subjectData = await getSubjectPeople(profile.id, token);
            setSubjectPeople(subjectData);
        } catch (err) {
            alert("Error al obtener las materias");
        }
    };

    fetchSubjects();
}, [profile?.id]); // Dependencia del effect

    // 6. Manejar estado de carga
    if (loading) {
        return <div className="loading">Cargando perfil...</div>;
    }

    console.log(subjectPeople)

    // console.log(profile)
  
  return (
    <div className="profile-container">

    <NavBar/>
        
      {/* Header Section */}
      <div className="profile-header">
        <Banner
            line1="Perfil de Usuario,"
            line2={profile.name + " " + profile.last_name ?? ""}
            subtitle="Revisa tus datos de perfil."
            image={BannerAdmin}
          />
        </div>

      {/* Profile Summary */}
      <div className="profile-summary">
        <h3 className="section-title">Resumen del Perfil</h3>
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Nombre y Apellido</span>
            <span className="summary-value">{profile.name + " " + profile.last_name ?? ""}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Proyecto Carrera</span>
            <span className="summary-value">Ingeniería Informática</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Cédula</span>
            <span className="summary-value">{profile.id_number ?? ""}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Correo electrónico</span>
            <span className="summary-value">{profile._email ?? ""}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tipo de Usuario</span>
            <span className="summary-value">{profile.user_type === 'student' ? 'Estudiante' : 'Profesor'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Dirección</span>
            <span className="summary-value">{profile.address ?? ""}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Teléfono</span>
            <span className="summary-value">{profile.phone_number ?? ""}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Fecha de Nacimiento</span>
            <span className="summary-value">{profile.birthdate ?? ""}</span>
          </div>
        </div>
      </div>



        {/* Assigned Subjects Section */}
    <h3 className="section-title">Materias Asignadas</h3>

    {subjectPeople.length > 0 ? (
      <div className="profile-sections">
        {subjectPeople.map((item) => (
          <div className="section-card" key={item.subject.id}>
            <div className="card-icon academic-icon"></div>
            <h4 className="card-title">{item.subject.name}</h4>
            <p className="card-description">{item.subject.description || 'Sin descripción'}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-subjects-message">
        <p>No tienes materias asignadas actualmente.</p>
      </div>
    )}




    </div>
  )
}

export default Profile
