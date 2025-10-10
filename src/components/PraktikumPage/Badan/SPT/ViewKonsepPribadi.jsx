import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCsrf } from "@/service/getCsrf";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import Swal from "sweetalert2";
import { useParams, useSearchParams } from "react-router";
import { useCookies } from "react-cookie";
import { useNavigateWithParams } from "@/hooks/useNavigateWithParams";
import { ClipLoader } from "react-spinners";
// import LihatKonsepPribadi from "./ViewKonsepPribadi"; 

const LihatKonsepPribadi = ({data}) => {

      console.log(data);
      const { id, akun, idSpt } = useParams();
      const [searchParams, setSearchParams] = useSearchParams();
      const viewAsCompanyId = searchParams.get("viewAs");
      const userId = searchParams.get("user_id");
      const [cookies] = useCookies(["token"]);
      const navigate = useNavigateWithParams();
    
      const [activeTab, setActiveTab] = useState("induk");
      const [showHeaderInduk, setShowHeaderInduk] = useState(false);
      const [showIdentitasPemotong, setShowIdentitasPemotong] = useState(false);
      const [showPajakPenghasilan21, setShowPajakPenghasilan21] = useState(false);
      const [showPajakPenghasilan26, setShowPajakPenghasilan26] = useState(false);
      const [showPernyataan, setShowPernyataan] = useState(true);
      const [showTabelBPPUnifikasi, setShowTabelBPPUnifikasi] = useState(false);
      const [showTabelBPNRUnifikasi, setShowTabelBPNRUnifikasi] = useState(false);
      const [showTabelDaftarPPh, setShowTabelDaftarPPh] = useState(false);
      const [showTabelDaftarPajakPenghasilan, setShowTabelDaftarPajakPenghasilan] =
        useState(false);
    
      const [showHeadera1, setShowHeadera1] = useState(false);
      const [showHeadera2, setShowHeadera2] = useState(false);
      const [showHeaderb1, setShowHeaderb1] = useState(false);
      const [showHeaderb2, setShowHeaderb2] = useState(false);
      const [showHeaderb3, setShowHeaderb3] = useState(false);
      const [showHeaderc, setShowHeaderc] = useState(false);
};

export default LihatKonsepPribadi;
