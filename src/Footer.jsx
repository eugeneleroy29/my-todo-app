
const Footer = ({ taskCount }) => {
  return (
    <footer className="footer">
      <h3>{taskCount === 0 ? `No tasks available` : `A Total of ${taskCount} task${taskCount > 1 ? "s" : ""} ${taskCount > 1 ? "have" : "has"} been added`}</h3>
    </footer>
  )
}

export default Footer