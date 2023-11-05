import { motion } from "framer-motion";
function AddRecipesPage () {
    return (<motion.div
    initial={{ opacity: 0, transform:`scale(0.7)` }}
    animate={{ opacity: 1, transform:`scale(1)`}}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.9,type: "spring",bounce:0.5 }}

    ><div>
        
        
    </div></motion.div>)

}

export default AddRecipesPage;