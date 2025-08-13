const AuthorFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="author-footer">
                <p className="mb-0">Made with React.js by <a href="https://github.com/Omyy27" target="_blank" rel="noreferrer" className="text-white">Omyy27</a></p>
                <p>© {currentYear} All rights reserved.</p>
            </div>
        </footer>
    );
}

export default AuthorFooter;