import {
  AcademicCapIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const EventModal = ({ isOpen, onClose, courses, selectedCourse, onSelectCourse, onDelete, darkMode }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${darkMode ? "dark-mode" : "light-mode"}`}>
        <div className="modal-header">
          <h2 className="modal-title">{selectedCourse ? "Modifier le cours" : "Choisir un cours"}</h2>
          <button className="close-icon-button" onClick={onClose} aria-label="Fermer">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`course-card ${selectedCourse?.id === course.id ? "selected" : ""}`}
              onClick={() => onSelectCourse(course.id)}
            >
              <div className="course-header">
                <AcademicCapIcon className="course-icon" />
                <h3 className="course-title">{course.matiere}</h3>
              </div>

              <div className="course-details-grid">
                <div className="detail-item">
                  <UserCircleIcon className="detail-icon" />
                  <span className="detail-text">{course.enseignant}</span>
                </div>

                <div className="detail-item">
                  <BuildingOffice2Icon className="detail-icon" />
                  <span className="detail-text">{course.salle}</span>
                </div>

                <div className="detail-item">
                  <CalendarDaysIcon className="detail-icon" />
                  <span className="detail-text">{new Date(course.date).toLocaleDateString("fr-FR")}</span>
                </div>

                <div className="detail-item">
                  <ClockIcon className="detail-icon" />
                  <span className="detail-text">{course.heure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <div className="button-group">
            {selectedCourse && (
              <button className="btn-danger" onClick={onDelete}>
                Supprimer
              </button>
            )}
            <button className="btn-secondary" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventModal
